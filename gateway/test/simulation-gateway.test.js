const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../index');

async function withServer(run) {
  const server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

test('health exposes simulation-only safety boundary', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.mode, 'simulation');
    assert.equal(body.physical_actuation_enabled, false);
    assert.equal(body.autonomous_settlement_enabled, false);
  });
});

test('sensor ingress rejects non-simulation input', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/sensors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gardenId: 'test-garden', ph: 7.1 })
    });
    assert.equal(response.status, 409);
  });
});

test('payment-adjacent prototype is disabled by default', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/payments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1 })
    });
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.autonomous_settlement_enabled, false);
  });
});
