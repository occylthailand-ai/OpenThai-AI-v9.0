# 🔧 Troubleshooting Guide

## General Issues

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

---

### Node Modules Issues

**Problem:** Module not found or version conflicts

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove dependencies
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Verify installation
npm list
```

---

## Database Issues

### PostgreSQL Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Verify connection string
echo $DATABASE_URL

# Test connection
psql -U postgres -d openthai_ai
```

### Database Migration Issues

**Problem:** Migration fails or hangs

**Solution:**
```bash
# Check migration status
npm run db:migrate:status

# Rollback last migration
npm run db:migrate:down

# Run specific migration
npm run db:migrate:up

# Reset database (⚠️ WARNING: Deletes data!)
npm run db:reset
```

---

## Redis Issues

### Redis Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:6379`

**Solution:**
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
redis-server

# Verify Redis URL
echo $REDIS_URL

# Flush cache if needed
redis-cli FLUSHALL
```

---

## API Issues

### Health Check Returns 503

**Problem:** `/health` endpoint returns Service Unavailable

**Solution:**
```bash
# Check application logs
npm run logs:dev

# Verify all services are running
curl http://localhost:3000/health

# Check database connection
npm run db:test-connection

# Check Redis connection
redis-cli ping
```

### Self-Healing Not Triggering

**Problem:** Self-Healing Monitor not responding to failures

**Solution:**
```bash
# Check healing status
curl http://localhost:3000/healing-status

# Verify configuration
echo $HEALING_CHECK_INTERVAL
echo $HEALING_AUTO_RESTART

# Check application logs
npm run logs:debug

# Restart application
npm restart
```

---

## Performance Issues

### Slow API Response

**Problem:** API endpoints respond slowly

**Solution:**
```bash
# Check Node.js memory
node --max-old-space-size=4096 dist/index.js

# Profile application
node --prof dist/index.js
node --prof-process isolate-*.log > profile.txt

# Check Redis cache hit rate
redis-cli INFO stats

# Optimize database queries
npm run db:analyze
```

### High Memory Usage

**Problem:** Memory usage keeps increasing

**Solution:**
```bash
# Monitor memory
watch -n 1 'ps aux | grep node'

# Check for memory leaks
npm run profile:memory

# Restart application
npm restart

# Enable garbage collection
node --expose-gc dist/index.js
```

---

## Docker Issues

### Docker Build Fails

**Problem:** `docker build` command fails

**Solution:**
```bash
# Clear Docker cache
docker system prune -a

# Build without cache
docker build --no-cache -t openthai-ai:v9.0 .

# Check Docker resources
docker system df
```

### Container Won't Start

**Problem:** Container exits immediately

**Solution:**
```bash
# Check container logs
docker logs <container_id>

# Run interactively for debugging
docker run -it openthai-ai:v9.0 /bin/bash

# Check environment variables
docker inspect <container_id> | grep Env
```

---

## Testing Issues

### Tests Fail Randomly

**Problem:** Intermittent test failures

**Solution:**
```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- --testPathPattern=health

# Increase timeout
npm test -- --testTimeout=10000

# Run tests sequentially
npm test -- --runInBand
```

### Coverage Below Expected

**Problem:** Code coverage is low

**Solution:**
```bash
# Generate coverage report
npm run test:coverage

# View detailed coverage
open coverage/lcov-report/index.html

# Find uncovered lines
grep 'uncovered' coverage/lcov.info
```

---

## Deployment Issues

### Deployment Fails

**Problem:** GitHub Actions deployment workflow fails

**Solution:**
```bash
# Check workflow logs on GitHub
# Navigate to Actions tab → View job logs

# Verify secrets are set
# Repository Settings → Secrets and variables

# Test deployment locally
DOCKER_REGISTRY=<registry> npm run deploy:test
```

---

## Getting Help

### Still Having Issues?

1. **Check Documentation**
   - [README.md](./README.md)
   - [docs/SETUP.md](./docs/SETUP.md)
   - [docs/API.md](./docs/API.md)

2. **Search GitHub Issues**
   - [Open Issues](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/issues)
   - [Closed Issues](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/issues?q=is%3Aissue+is%3Aclosed)

3. **Create a New Issue**
   - Include error message and stack trace
   - Describe steps to reproduce
   - Include environment details (OS, Node version, etc.)

4. **Community Support**
   - 💬 [GitHub Discussions](https://github.com/occylthailand-ai/OpenThai-AI-v9.0/discussions)
   - 📧 Email: support@openthai-ai.com

---

## Reporting Bugs

When reporting a bug, please include:

```markdown
### Environment
- OS: [e.g., Ubuntu 22.04]
- Node.js: [e.g., v18.15.0]
- npm: [e.g., 9.5.0]
- OpenThai-AI: [e.g., v9.0.0]

### Error Message
```
[Paste error message and stack trace]
```

### Steps to Reproduce
1. ...
2. ...
3. ...

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]
```

---

*Last updated: 2026-05-08*
