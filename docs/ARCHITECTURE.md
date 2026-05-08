# 🏗️ Architecture Documentation

## System Overview

OpenThai-AI-v9.0 ประกอบด้วยส่วนประกอบหลักดังต่อไปนี้:

### 1. Health Check System
- ตรวจสอบสถานะของระบบแบบเรียลไทม์
- บันทึกข้อมูล uptime และประสิทธิภาพ
- API endpoint สำหรับการเรียกข้อมูลสถานะ

### 2. Self-Healing Monitor
- ตรวจสอบความสุขภาพของระบบ
- ตรวจจับปัญหาโดยอัตโนมัติ
- เรียกใช้กระบวนการซ่อมแซมเมื่อจำเป็น

### 3. Thai Language Processing
- ประมวลผลข้อความภาษาไทย
- การวิเคราะห์และทำความเข้าใจภาษาธรรมชาติ

---

## Technology Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Web Framework**: Express.js
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

---

## Deployment

รองรับการปรับใช้บน:
- Cloud Platforms (AWS, GCP, Azure)
- Kubernetes
- Docker
- Traditional VPS

---

For more details about development setup, see [SETUP.md](./SETUP.md)
