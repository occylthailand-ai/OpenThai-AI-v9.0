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

### 4. Build TypeScript

```bash
npm run build
```

### 5. Start Development Server

```bash
npm run dev
```

Server จะเริ่มท���่ `http://localhost:3000`

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
```

---

## 🐳 Docker Setup

```bash
# Build Docker image
docker build -t openthai-ai:v9.0 .

# Run container
docker run -p 3000:3000 openthai-ai:v9.0
```

---

## 🔐 Security Setup

### Generate API Keys

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧪 Verify Installation

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

---

## 💬 Support

- 📖 [Documentation](https://docs.openthai-ai.com)
- 💬 [GitHub Discussions](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/discussions)
- 🐛 [Report Issues](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/issues)
