# 🚀 Deployment Guide

## Overview

This guide covers deploying OpenThai-AI-v9.0 to various environments and platforms.

---

## Table of Contents

1. [Local Development](#local-development)
2. [Staging Environment](#staging-environment)
3. [Production Deployment](#production-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [Cloud Providers](#cloud-providers)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Local Development

### Quick Start

```bash
# Clone repository
git clone https://github.com/occylthailand-ai/OpenThai-AI-v9.0.git
cd OpenThai-AI-v9.0

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Build TypeScript
npm run build

# Start development server
npm run dev
```

### Development Server

- URL: `http://localhost:3000`
- Hot reload enabled
- Debug mode active

---

## Staging Environment

### Pre-deployment Checks

```bash
# Run all tests
npm test

# Check code quality
npm run lint
npm run format:check

# Build for production
npm run build

# Check for vulnerabilities
npm audit
```

### Deploy to Staging

```bash
# Set environment
export NODE_ENV=staging

# Run migrations
npm run db:migrate

# Seed data (if needed)
npm run db:seed

# Start server
npm start
```

---

## Production Deployment

### Pre-deployment Requirements

- ✅ All tests passing
- ✅ Code review completed
- ✅ Environment variables configured
- ✅ Database backups created
- ✅ SSL certificates ready
- ✅ Monitoring setup

### Deployment Steps

```bash
# 1. Prepare
export NODE_ENV=production
export DATABASE_URL=<production_db_url>
export REDIS_URL=<production_redis_url>

# 2. Install dependencies
npm ci --omit=dev

# 3. Build
npm run build

# 4. Database migrations
npm run db:migrate

# 5. Start with PM2
pm2 start ecosystem.config.js

# 6. Verify health
curl https://openthai-ai.com/health
```

### ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'openthai-ai',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '1G'
  }]
};
```

---

## Docker Deployment

### Build Docker Image

```bash
# Build
docker build -t openthai-ai:v9.0 .

# Tag for registry
docker tag openthai-ai:v9.0 <registry>/openthai-ai:v9.0

# Push to registry
docker push <registry>/openthai-ai:v9.0
```

### Run Docker Container

```bash
docker run -d \
  --name openthai-ai \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  -v /data/logs:/app/logs \
  <registry>/openthai-ai:v9.0
```

### Docker Compose

```bash
# Start all services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

---

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster ready
- kubectl configured
- Helm installed (optional)

### Deploy with kubectl

```bash
# Create namespace
kubectl create namespace openthai-ai

# Create secrets
kubectl create secret generic openthai-ai-secrets \
  --from-literal=DATABASE_URL=... \
  --from-literal=REDIS_URL=... \
  -n openthai-ai

# Deploy
kubectl apply -f k8s/deployment.yaml -n openthai-ai

# Check deployment
kubectl get pods -n openthai-ai
kubectl logs -f deployment/openthai-ai -n openthai-ai
```

### k8s/deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openthai-ai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openthai-ai
  template:
    metadata:
      labels:
        app: openthai-ai
    spec:
      containers:
      - name: openthai-ai
        image: <registry>/openthai-ai:v9.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: openthai-ai-secrets
              key: DATABASE_URL
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## Cloud Providers

### AWS EC2

```bash
# SSH to instance
ssh -i key.pem ec2-user@<instance-ip>

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs

# Clone and deploy
git clone https://github.com/occylthailand-ai/OpenThai-AI-v9.0.git
cd OpenThai-AI-v9.0
npm install
npm run build
pm2 start ecosystem.config.js
```

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/<project>/openthai-ai

# Deploy
gcloud run deploy openthai-ai \
  --image gcr.io/<project>/openthai-ai \
  --platform managed \
  --region us-central1 \
  --memory 1Gi \
  --set-env-vars NODE_ENV=production
```

### Heroku

```bash
# Login
heroku login

# Create app
heroku create openthai-ai

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=<url>

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## Monitoring & Maintenance

### Health Checks

```bash
# Application health
curl https://openthai-ai.com/health

# Self-healing status
curl https://openthai-ai.com/healing-status

# Database health
npm run health:db

# Redis health
npm run health:redis
```

### Logs Management

```bash
# View logs
tail -f logs/app.log

# Rotate logs
npm run logs:rotate

# Archive old logs
npm run logs:archive
```

### Performance Monitoring

```bash
# CPU and Memory
watch -n 1 'ps aux | grep node'

# Process monitoring with PM2
pm2 monit

# Dashboard
pm2 web
```

### Database Maintenance

```bash
# Backup database
npm run db:backup

# Verify backup
npm run db:verify-backup

# Restore database
npm run db:restore
```

---

## Rollback Procedures

### If Deployment Fails

```bash
# Check current version
pm2 show openthai-ai

# Rollback to previous version
git revert <commit-hash>
npm run build
pm2 restart openthai-ai

# Or manually
pm2 stop openthai-ai
git checkout <previous-tag>
npm install
npm run build
pm2 start ecosystem.config.js
```

---

## Security Checklist

- [ ] SSL/TLS certificates installed
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] Firewall rules configured
- [ ] API rate limiting enabled
- [ ] Logging and monitoring active
- [ ] Backup strategy in place
- [ ] Security headers configured
- [ ] Dependencies updated and audited
- [ ] Access logs enabled

---

## Troubleshooting

For common deployment issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

*Last updated: 2026-05-08*
