// src/routes/healthcheck.js (ES Modules)
import { Router } from 'express';

const router = Router();

router.get('/health', async (req, res) => {
  const healthcheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: process.env.SERVICE_NAME || 'utflix-pagamentos',
    checks: {}
  };

  try {
    const memUsage = process.memoryUsage();
    healthcheck.checks.memory = {
      status: 'UP',
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`
    };

    res.status(200).json(healthcheck);
  } catch {
  healthcheck.status = 'DOWN';
  res.status(503).json(healthcheck);
}
});

router.get('/health/ready', async (req, res) => {
  res.status(200).json({
    status: 'READY',
    timestamp: new Date().toISOString()
  });
});

router.get('/health/live', (req, res) => {
  res.status(200).json({
    status: 'ALIVE',
    timestamp: new Date().toISOString()
  });
});

export default router;