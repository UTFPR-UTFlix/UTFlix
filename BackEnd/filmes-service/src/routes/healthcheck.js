// src/routes/healthcheck.js
const express = require('express');
const router = express.Router();

/**
 * @route GET /health
 * @desc Endpoint de healthcheck para verificar status da aplicação
 * @access Public
 */
router.get('/health', async (req, res) => {
  const healthcheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: process.env.SERVICE_NAME || 'utflix-service',
    checks: {}
  };

  try {


    // Verifica memória
    const memUsage = process.memoryUsage();
    healthcheck.checks.memory = {
      status: 'UP',
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`
    };

    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.status = 'DOWN';
    healthcheck.checks.database = {
      status: 'DOWN',
      error: error.message
    };
    
    res.status(503).json(healthcheck);
  }
});

/**
 * @route GET /health/ready
 * @desc Verifica se a aplicação está pronta para receber requisições
 * @access Public
 */
router.get('/health/ready', async (req, res) => {
  try {
    // Adicione verificações de dependências críticas aqui
    // Por exemplo: banco de dados, serviços externos, etc.
    
    res.status(200).json({
      status: 'READY',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'NOT_READY',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

/**
 * @route GET /health/live
 * @desc Verifica se a aplicação está viva (para Kubernetes liveness)
 * @access Public
 */
router.get('/health/live', (req, res) => {
  res.status(200).json({
    status: 'ALIVE',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;