/**
 * EVA IONI - simulation gateway adapter
 *
 * This process is intentionally simulation-only by default. It may forward
 * simulated environmental telemetry to the MyZubster robot simulation runtime,
 * but it does not enable physical actuation or autonomous payments.
 */

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = Number(process.env.PORT || 3002);
const MYZUBSTER_SIMULATION_API = process.env.MYZUBSTER_SIMULATION_API ||
  'https://www.myzubster.com/api/robots/simulation/telemetry';
const MONERO_GATEWAY = process.env.MONERO_GATEWAY || 'http://localhost:3003';
const PAYMENT_PROTOTYPE_ENABLED = process.env.EVA_PAYMENT_PROTOTYPE_ENABLED === 'true';

app.use(express.json({ limit: '32kb' }));

function simulationToken() {
  return process.env.ROBOT_SIMULATION_TOKEN || process.env.CRON_SECRET || '';
}

function paymentPrototypeGuard(_req, res, next) {
  if (!PAYMENT_PROTOTYPE_ENABLED) {
    return res.status(503).json({
      success: false,
      error: 'EVA payment prototype is disabled by default',
      autonomous_settlement_enabled: false
    });
  }
  return next();
}

app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    service: 'EVA IONI Simulation Gateway',
    version: '1.1.0-simulation',
    mode: 'simulation',
    myzubster_simulation_api: MYZUBSTER_SIMULATION_API,
    simulation_auth_configured: Boolean(simulationToken()),
    physical_actuation_enabled: false,
    payment_prototype_enabled: PAYMENT_PROTOTYPE_ENABLED,
    autonomous_settlement_enabled: false
  });
});

// Simulation-only sensor ingress. A physical controller must not use this route
// as evidence of HARDWARE_CONNECTED status.
app.post('/api/sensors', async (req, res) => {
  const { gardenId, ph, ec, temperature, humidity, timestamp, mode } = req.body || {};

  if (mode !== 'simulation') {
    return res.status(409).json({
      success: false,
      error: 'Physical hardware ingestion is not enabled; mode must be simulation',
      physical_actuation_enabled: false
    });
  }
  if (!gardenId || ph === undefined) {
    return res.status(400).json({ success: false, error: 'gardenId and ph are required' });
  }

  const token = simulationToken();
  if (!token) {
    return res.status(503).json({
      success: false,
      error: 'ROBOT_SIMULATION_TOKEN/CRON_SECRET is not configured'
    });
  }

  const telemetry = {
    garden_id: String(gardenId).slice(0, 120),
    ph,
    ec,
    temperature_c: temperature,
    soil_moisture_pct: humidity,
    source_timestamp: timestamp ?? null,
    synthetic: true
  };

  try {
    const response = await axios.post(
      MYZUBSTER_SIMULATION_API,
      {
        robot_id: 'EVA-IONI',
        mode: 'simulation',
        telemetry
      },
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log('[eva-sim] telemetry forwarded', JSON.stringify({
      garden_id: telemetry.garden_id,
      status: response.status
    }));

    return res.status(202).json({
      success: true,
      message: 'Simulation telemetry forwarded to MyZubster',
      downstream: response.data,
      physical_actuation_performed: false
    });
  } catch (error) {
    console.error('[eva-sim] forward error', error.message);
    return res.status(502).json({
      success: false,
      error: 'Unable to forward simulation telemetry',
      downstream_status: error.response?.status || null
    });
  }
});

// ============================================================
// PAYMENT-ADJACENT PROTOTYPE — DISABLED BY DEFAULT
// ============================================================

app.post('/api/payments/create', paymentPrototypeGuard, async (req, res) => {
  try {
    const { amount, description, metadata } = req.body || {};
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: 'Amount is required and must be > 0' });
    }
    const response = await axios.post(`${MONERO_GATEWAY}/api/payments`, { amount, description, metadata }, { timeout: 10000 });
    return res.json(response.data);
  } catch (error) {
    return res.status(502).json({ success: false, error: 'Payment prototype downstream unavailable' });
  }
});

app.post('/api/payments/verify/:id', paymentPrototypeGuard, async (req, res) => {
  try {
    const response = await axios.post(`${MONERO_GATEWAY}/api/payments/${req.params.id}/verify`, null, { timeout: 10000 });
    return res.json(response.data);
  } catch (error) {
    return res.status(502).json({ success: false, error: 'Payment verification prototype unavailable' });
  }
});

app.get('/api/payments/status/:id', paymentPrototypeGuard, async (req, res) => {
  try {
    const response = await axios.get(`${MONERO_GATEWAY}/api/payments/${req.params.id}`, { timeout: 10000 });
    return res.json(response.data);
  } catch (error) {
    return res.status(502).json({ success: false, error: 'Payment status prototype unavailable' });
  }
});

app.post('/api/payments/robot', paymentPrototypeGuard, (_req, res) => {
  return res.status(501).json({
    success: false,
    error: 'Robot-rental payment creation is not enabled in the simulation runtime',
    autonomous_settlement_enabled: false
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`EVA IONI simulation gateway listening on port ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`Simulation ingress: http://localhost:${PORT}/api/sensors`);
  });
}
