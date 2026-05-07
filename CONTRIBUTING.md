# 🤝 การมีส่วนร่วม (Contributing Guide)

ขอบคุณที่สนใจในการมีส่วนร่วมในโปรเจกต์ OpenThai-AI-v9.0! คุณเป็นส่วนสำคัญของชุมชนของเรา 💪

## 📋 วิธีการมีส่วนร่วม

### 1. **การสร้าง Fork และ Clone**

```bash
# Fork โปรเจกต์บน GitHub
# จากนั้น clone ลงมาในเครื่องของคุณ
git clone https://github.com/YOUR-USERNAME/OpenThai-AI-v9.0.git
cd OpenThai-AI-v9.0

# เพิ่ม upstream
git remote add upstream https://github.com/occylthailand-ai/OpenThai-AI-v9.0.git
```

### 2. **สร้าง Feature Branch**

```bash
git checkout -b feature/your-feature-name

# หรือสำหรับ bug fixes
git checkout -b fix/bug-description

# หรือสำหรับเอกสาร
git checkout -b docs/documentation-update
```

### 3. **ทำการเปลี่ยนแปลง**

- ปฏิบัติตามรูปแบบการเขียนโค้ด (Code Style)
- เพิ่มการทดสอบสำหรับฟีเจอร์ใหม่
- อัปเดตเอกสารตามที่ต้องการ

### 4. **Commit ข้อความที่ชัดเจน**

```bash
git commit -m "feat: Add self-healing feature for Thai AI"
git commit -m "fix: Resolve health check timeout issue"
git commit -m "docs: Update API documentation"
git commit -m "test: Add unit tests for healing logic"
```

### 5. **Push และสร้าง Pull Request**

```bash
git push origin feature/your-feature-name
```

จากนั้นสร้าง Pull Request บน GitHub พร้อมคำอธิบายที่ชัดเจน

---

## 📝 Commit Message Convention

ใช้รูปแบบ Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - ฟีเจอร์ใหม่
- `fix` - การแก้ไขข้อบกพร่อง
- `docs` - เอกสาร
- `style` - การจัดรูปแบบ (formatting, semicolons, etc)
- `refactor` - การปรับปรุงโค้ด
- `test` - การเพิ่มการทดสอบ
- `chore` - การอัปเดต dependencies หรือ build process

### ตัวอย่าง
```
feat(health-check): Add uptime monitoring endpoint

Add new endpoint to monitor system uptime and performance metrics.
Includes real-time status updates and historical data tracking.

Closes #5
```

---

## 🧪 การทดสอบ (Testing)

```bash
# รันการทดสอบทั้งหมด
npm test

# รันการทดสอบพร้อมความครอบคลุม
npm run test:coverage

# รันการทดสอบในโหมดโปรแกรม
npm run test:watch
```

---

## 🔍 ลักษณะคุณภาพของโค้ด (Code Quality)

```bash
# ตรวจสอบรูปแบบโค้ด
npm run lint

# แก้ไขปัญหา linting โดยอัตโนมัติ
npm run lint:fix

# ตรวจสอบกา���จัดรูปแบบ
npm run format:check

# จัดรูปแบบโค้ด
npm run format
```

---

## 📚 แนวทางการเขียนโค้ด (Code Style Guide)

### TypeScript Best Practices

```typescript
// ✅ ดี: ชื่อตัวแปรที่ชัดเจน
const isHealthy = true;
const userCount = 42;

// ❌ ไม่ดี: ชื่อสั้นหรือไม่ชัดเจน
const h = true;
const cnt = 42;

// ✅ ดี: ใช้ type annotations
function checkHealth(): Promise<HealthStatus> {
  // ...
}

// ❌ ไม่ดี: ไม่มี type annotations
function checkHealth() {
  // ...
}
```

### Error Handling

```typescript
// ✅ ดี: จัดการข้อผิดพลาดอย่างเหมาะสม
try {
  const result = await healSystem();
  return result;
} catch (error) {
  logger.error('Healing failed:', error);
  throw new SystemError('Self-healing process failed');
}

// ❌ ไม่ดี: ไม่จัดการข้อผิดพลาด
const result = await healSystem();
return result;
```

---

## 📋 Checklist สำหรับ Pull Request

- [ ] เมื่อสร้าง PR ใ��้ให้เรื่องชัดเจน
- [ ] เพิ่มคำอธิบายของการเปลี่ยนแปลง
- [ ] มีการทดสอบที่เกี่ยวข้อง
- [ ] อัปเดตเอกสารหากจำเป็น
- [ ] ยืนยันว่า CI checks ผ่าน
- [ ] ไม่มี conflict กับ main branch

---

## 🐛 การรายงานข้อบกพร่อง (Bug Reports)

### ข้อมูลที่จำเป็น

1. **ชื่อเรื่อง**: สั้นและชัดเจน
   ```
   Health check endpoint returns 500 error on startup
   ```

2. **คำอธิบาย**: ให้รายละเอียดปัญหา
   ```
   When the application starts, calling /health endpoint 
   returns 500 Internal Server Error for 30 seconds.
   ```

3. **ขั้นตอนในการทำซ้ำ**:
   ```
   1. npm install
   2. npm start
   3. curl http://localhost:3000/health
   ```

4. **พฤติกรรมที่คาดหวัง**:
   ```
   Should return 200 with health status immediately
   ```

5. **พฤติกรรมจริง**:
   ```
   Returns 500 error for ~30 seconds after startup
   ```

6. **สภาพแวดล้อม**:
   ```
   - OS: Ubuntu 22.04
   - Node.js: v18.15.0
   - npm: 9.5.0
   ```

---

## 💡 การขอฟีเจอร์ใหม่ (Feature Requests)

1. ตรวจสอบว่าฟีเจอร์ที่คล้ายกันมีอยู่แล้วหรือไม่
2. ให้คำอธิบายใหญ่ของฟีเจอร์ที่คุณต้องการ
3. ระบุวิธีการใช้งานและประโยชน์
4. ให้ตัวอย่างหรือ mock-up หากเป็นไปได้

---

## 📖 เอกสารประกอบ

- [README.md](./README.md) - ภาพรวมโปรเจกต์
- [LICENSE](./LICENSE) - ข้อมูลใบอนุญาต MIT
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - จรรยาบรรณชุมชน

---

## ❓ คำถามหรือความช่วยเหลือ

- 💬 [GitHub Discussions](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/discussions)
- 📧 หารือกับ maintainers บน GitHub Issues
- 🤝 เข้าร่วมชุมชน OpenThai-AI ของเรา

---

## 🎉 ขอบคุณ!

ขอบคุณที่ช่วยให้โปรเจกต์นี้ดีขึ้น! การมีส่วนร่วมของคุณนั้นมีค่ามาก ❤️

Happy coding! 🚀
