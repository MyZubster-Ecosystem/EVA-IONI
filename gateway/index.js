/**
 * EVA IONI - Gateway API
 * Riceve dati dai sensori Arduino e li inoltra a MyZubster
 */

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3002;

app.use(express.json());

// Endpoint per ricevere dati da Arduino
app.post('/api/sensors', async (req, res) => {
  const { gardenId, ph, ec, temperature, humidity, timestamp } = req.body;
  
  if (!gardenId || ph === undefined) {
    return res.status(400).json({ 
      error: 'gardenId and ph are required' 
    });
  }

  console.log(`📡 Ricevuti dati da ${gardenId}:`, {
    ph, ec, temperature, humidity
  });

  try {
    // Inoltra a MyZubster Marketplace
    const response = await axios.post(
      'http://localhost:4000/api/sensors/data',
      req.body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    res.json({
      success: true,
      message: 'Dati inoltrati a MyZubster',
      data: response.data
    });
  } catch (error) {
    console.error('❌ Errore inoltro:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'EVA IONI Gateway',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`🚪 EVA IONI Gateway avviato su porta ${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/sensors`);
  console.log(`🔍 Health: http://localhost:${PORT}/health`);
});
