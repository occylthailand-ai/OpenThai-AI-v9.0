# 🔐 Security Policy

## Reporting Security Vulnerabilities

**Do NOT open a public issue for security vulnerabilities!**

Please report security issues to: **security@openthai-ai.com**

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## Security Best Practices

### For Users

1. **Keep Dependencies Updated**
   ```bash
   npm update
   npm audit
   ```

2. **Use Environment Variables**
   - Never hardcode secrets
   - Use `.env` files (not committed)
   - Rotate credentials regularly

3. **HTTPS Only**
   - Always use HTTPS in production
   - Install valid SSL certificates
   - Enable HSTS headers

4. **Access Control**
   - Use strong API keys
   - Implement rate limiting
   - Monitor access logs
   - Implement 2FA for critical operations

### For Developers

1. **Code Review**
   - Review all pull requests
   - Check for security issues
   - Use automated tools (SonarQube, etc.)

2. **Dependency Management**
   ```bash
   npm audit fix
   npm outdated
   ```

3. **Input Validation**
   - Validate all inputs
   - Sanitize user data
   - Use parameterized queries

4. **Logging**
   - Log security events
   - Monitor for suspicious activity
   - Don't log sensitive data

---

## Supported Versions

| Version | Supported | Status |
|---------|-----------|--------|
| 9.0.x   | Yes       | Current |
| 8.9.x   | Limited   | Bug fixes only |
| < 8.9   | No        | Unsupported |

---

## Security Headers

Ensure these headers are configured:

```typescript
// Express middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
```

---

## Known Issues

Currently, there are no known critical security issues.

For a list of fixed vulnerabilities, see [CHANGELOG.md](./CHANGELOG.md)

---

## Security Audit

This project undergoes regular security audits:
- Automated dependency scanning (npm audit)
- Code quality analysis
- Penetration testing (planned for v9.1)

---

## Contact

- 🔐 Security: security@openthai-ai.com
- 📧 General: team@openthai-ai.com
- 💬 Issues: [GitHub Issues](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/issues)

---

*Last updated: 2026-05-08*
