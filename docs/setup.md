# EVA IONI - Setup Guide

## 1. Hardware Setup
- Arduino UNO/Nano
- Sensori: pH, EC, temperatura, umidità
- Braccio robotico 4 DOF

## 2. Software Setup
```bash
git clone https://github.com/MyZubster-Ecosystem/EVA-IONI.git
cd EVA-IONI
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
3. API Endpoints

    GET /api/eva/sensors/environmental

    GET /api/eva/sensors/air-quality

    GET /api/eva/sensors/weather

    GET /api/eva/irrigation/status

    POST /api/eva/irrigation/start

    GET /api/eva/biodiversity

    POST /api/eva/ai/recommendations

4. MyZubster Integration

    Gateway: http://localhost:5003

    API: http://localhost:5015/api/eva

5. Test Commands
bash

curl http://localhost:5015/api/eva/sensors/environmental
curl http://localhost:5015/api/eva/ai/stats
curl -X POST http://localhost:5015/api/eva/ai/recommendations -H "Content-Type: application/json" -d '{"soil_data": {"ph": 6.5}, "plant_type": "Pomodoro"}'

