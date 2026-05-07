# 🚀 Setup Guide

## ระบบข้อกำหนดเบื้องต้น (Prerequisites)

### ซอฟต์แวร์จำเป็น

- **Node.js**: v18.0 หรือสูงกว่า
- **npm**: v9.0 หรือสูงกว่า (หรือ yarn/pnpm)
- **Git**: v2.30 หรือสูงกว่า
- **Docker**: (ทางเลือก) สำหรับการรันด้วย Docker

### ฮาร์ดแวร์ขั้นต่ำ

- **RAM**: 4 GB
- **CPU**: 2 cores
- **Disk Space**: 2 GB

### ระบบปฏิบัติการที่รองรับ

- ✅ macOS (Intel & Apple Silicon)
- ✅ Linux (Ubuntu 20.04+, CentOS 8+)
- ✅ Windows 10/11 (WSL2 แนะนำ)

---

## 🔧 Installation

### 1. Clone Repository

```bash
git clone https://github.com/occylthailand-ai/OpenThai-AI-v9.0.git
cd OpenThai-AI-v9.0
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Environment Variables

สร้างไฟล์ `.env` ในรูท directory:

```bash
cp .env.example .env
```

แก้ไข `.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/openthai_ai
DATABASE_POOL_SIZE=10

# Redis Cache
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Thai NLP Engine
THAI_NLP_API_URL=http://localhost:5000
THAI_NLP_API_KEY=your_key_here

# Logging
LOG_LEVEL=debug
LOG_FORMAT=json

# API Configuration
API_VERSION=v1
API_KEY_SECRET=your_secret_key_here

# Self-Healing Configuration
HEALING_CHECK_INTERVAL=30000
HEALING_AUTO_RESTART=true
HEALING_MAX_RETRIES=3

# Monitoring
METRICS_ENABLED=true
METRICS_PORT=9090

# External Services
NOTIFICATION_EMAIL=alerts@openthai-ai.com
SLACK_WEBHOOK_URL=
```

### 4. Build TypeScript

```bash
npm run build
```

### 5. Start Development Server

```bash
npm run dev
```

Server จะเริ่มที่ `http://localhost:3000`

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript
npm start                # Run production build

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # Check code style
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run format:check     # Check formatting

# Database
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset database

# Documentation
npm run docs:generate    # Generate API documentation
npm run docs:serve       # Serve documentation locally
```

---

## 🐳 Docker Setup

### Using Docker

```bash
# Build Docker image
docker build -t openthai-ai:v9.0 .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://user:pass@db:5432/openthai \
  openthai-ai:v9.0
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app
```

**docker-compose.yml** example:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://postgres:password@db:5432/openthai_ai
      REDIS_URL: redis://cache:6379
    depends_on:
      - db
      - cache
    networks:
      - app-network

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: openthai_ai
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  cache:
    image: redis:7-alpine
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

---

## 📊 Database Setup

### PostgreSQL

```bash
# Create database
createdb openthai_ai

# Run migrations
npm run db:migrate

# Seed sample data
npm run db:seed
```

### Running Migrations

```bash
# Create new migration
npm run db:migrate:create --name=add_users_table

# Run pending migrations
npm run db:migrate:up

# Rollback last migration
npm run db:migrate:down
```

---

## ⚙️ Configuration Files

### `tsconfig.json`

TypeScript configuration ได้ปรับตั้งไว้สำหรับโปรเจกต์นี้ตามแล้ว

### `.eslintrc.json`

Linting rules สำหรับรักษาคุณภาพโค้ด

### `.prettierrc.json`

Code formatting configuration

### `jest.config.js`

Testing framework configuration

---

## 🔐 Security Setup

### 1. Generate API Keys

```bash
npm run generate:apikey
```

### 2. Setup JWT Secret

```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. SSL/TLS Certificate (Optional)

สำหรับ HTTPS:

```bash
# Using Let's Encrypt
certbot certonly --standalone -d yourdomain.com

# Copy certificates to project
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./certs/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./certs/
```

---

## 🧪 Verify Installation

### 1. Health Check

```bash
curl -X GET http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "v9.0",
  "timestamp": "2026-05-07T10:30:00Z"
}
```

### 2. Run Tests

```bash
npm test
```

### 3. Check API Endpoints

```bash
# List all available endpoints
npm run show:routes
```

---

## 📝 Initial Configuration

### 1. Create Admin User

```bash
npm run setup:admin
```

### 2. Configure Webhooks

```bash
npm run setup:webhooks
```

### 3. Enable Monitoring

```bash
npm run setup:monitoring
```

---

## 🚀 Production Deployment

### 1. Build for Production

```bash
npm run build
npm prune --production
```

### 2. Set Environment Variables

```bash
export NODE_ENV=production
export DATABASE_URL=your_db_url
export REDIS_URL=your_redis_url
```

### 3. Run Production Server

```bash
npm start
```

### 4. Process Manager (PM2)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Restart
pm2 restart openthai-ai
```

**ecosystem.config.js**:
```javascript
module.exports = {
  apps: [{
    name: 'openthai-ai',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

---

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql -U postgres

# Verify connection string
echo $DATABASE_URL

# Test connection
npm run db:test-connection
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping

# Verify Redis URL
echo $REDIS_URL

# Restart Redis
redis-server
```

### Node Module Issues

```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

1. ✅ [Read API Documentation](./API.md)
2. ✅ [Review Architecture](./ARCHITECTURE.md)
3. ✅ [Contributing Guidelines](../CONTRIBUTING.md)
4. ✅ [Run Tests](https://github.com/occylthailand-ai/OpenThai-AI-v9.0#test)

---

## 💬 Support

- 📖 [Documentation](https://docs.openthai-ai.com)
- 💬 [GitHub Discussions](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/discussions)
- 🐛 [Report Issues](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/issues)

---

*Last updated: 2026-05-07*
