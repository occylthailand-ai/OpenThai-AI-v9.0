# 📚 API Documentation

## Health Check Endpoint

### GET /health

ตรวจสอบสถานะของระบบ

**Response:**
```json
{
  "status": "healthy",
  "uptime": 12345.67,
  "timestamp": "2026-05-07T10:00:00Z",
  "version": "v9.0",
  "thaiAI": "connected",
  "lastDeploy": "success"
}
```

**Status Codes:**
- `200 OK` - ระบบสุขภาพดี
- `503 Service Unavailable` - ระบบมีปัญหา

---

## Self-Healing Endpoints

### GET /healing-status

ดูสถานะของระบบซ่อมแซมอัตโนมัติ

**Response:**
```json
{
  "isHealing": false,
  "lastHealTime": "2026-05-06T15:30:00Z",
  "issuesFixed": 2,
  "currentHealth": 98.5
}
```

---

## Error Handling

### Common Error Responses

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "timestamp": "2026-05-07T10:00:00Z"
  }
}
```

**Error Codes:**
- `SERVICE_UNAVAILABLE` - บริการไม่พร้อม
- `INVALID_REQUEST` - คำขอไม่ถูกต้อง
- `INTERNAL_ERROR` - ข้อผิดพลาดภายใน

---

For more details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
