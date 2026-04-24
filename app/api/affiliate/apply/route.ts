import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const affiliate = await prisma.affiliate.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        platform: body.platform,
        followers: body.followers || null,
        referralCode: `AFF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        status: 'pending'
      }
    });

    return NextResponse.json({
      success: true,
      message: "สมัคร Affiliate สำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
      referralCode: affiliate.referralCode
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      success: false, 
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" 
    }, { status: 500 });
  }
}
