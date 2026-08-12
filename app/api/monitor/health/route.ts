import { NextRequest, NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * GET /api/monitor/health
 * 
 * Returns the health status of the application
 */
export async function GET(request: NextRequest) {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '9.0',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(healthStatus, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

/**
 * Optional: POST endpoint for detailed health diagnostics
 */
export async function POST(request: NextRequest) {
  try {
    // NOTE: deliberately do NOT parse the request body. These diagnostics are derived purely from
    // the running process (memory/uptime/node version) and never used any input. The old code did
    // `await request.json()`, which THROWS on an empty/absent body — exactly how a monitoring probe
    // calls a health endpoint (`curl -X POST .../health` with no body) — so every normal diagnostics
    // probe fell into the catch and returned 500, masking the real health it was meant to report.
    const diagnostics = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      checks: {
        memory: {
          total: Math.round(require('os').totalmem() / 1024 / 1024) + ' MB',
          free: Math.round(require('os').freemem() / 1024 / 1024) + ' MB',
        },
        uptime: process.uptime() + ' seconds',
        nodeVersion: process.version,
      },
    };

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error) {
    console.error('Diagnostics error:', error);
    
    return NextResponse.json(
      { status: 'error', message: 'Failed to run diagnostics' },
      { status: 500 }
    );
  }
}
