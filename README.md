# 🌱 EVA IONI

**The First Open-Source Robot for Urban Gardens**

EVA IONI is an open-source robotic platform for urban gardens, powered by MyZubster and Monero (XMR).

---

## 🚀 Mission

> *"Democratize food production through open-source robotics and decentralized payments."*

We believe everyone should be able to grow their own food, with technology that is:
- **Open Source** — No black boxes, no vendor lock-in
- **Private** — Powered by Monero, no surveillance
- **Affordable** — Target price < 10.000€
- **Community-Driven** — Built by the people, for the people

---

## 🤖 What EVA IONI Can Do

| Feature | Description | Status |
|---------|-------------|--------|
| 🌍 Environmental Sensors | Air quality, weather, acoustics, light | ✅ |
| 💧 Autonomous Irrigation | Smart watering based on soil moisture | ✅ |
| 🗺️ Biodiversity Mapping | Species detection, pollinator tracking | ✅ |
| 🧠 AI Recommendations | Personalized gardening advice | ✅ |
| 🦾 Robotic Arm (4 DOF) | Irrigation, analysis, harvesting | ✅ |
| 🔌 Rich APIs | FastAPI + WebSocket + REST | ✅ |
| 💰 Monero Payments | Private, decentralized payments | ✅ |

---

## 🏗️ Architecture

📱 User Interface (Web/Telegram) → 🌐 MyZubster Gateway (Node.js) → 🤖 EVA IONI Core (Python + FastAPI) → 📡 Sensors & Actuators (Arduino/ESP32) → 🌍 Physical Garden

---

## 🔧 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Arduino IDE (for sensors)

### Install
```bash
git clone https://github.com/MyZubster-Ecosystem/EVA-IONI.git
cd EVA-IONI
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## 📡 API Endpoints

### Environmental Sensors
- GET /api/eva/sensors/environmental — Current data
- GET /api/eva/sensors/air-quality — Air quality
- GET /api/eva/sensors/weather — Weather forecast

### Irrigation
- GET /api/eva/irrigation/status — System status
- POST /api/eva/irrigation/start — Start watering
- POST /api/eva/irrigation/stop — Stop watering

---

## 🔗 Links

- **GitHub**: https://github.com/MyZubster-Ecosystem/EVA-IONI
- **MyZubster**: https://myzubster.com
- **Monero**: https://getmonero.org

---

## 📄 License

MIT — Open source, forever.

---

**🌱 EVA IONI — Cultivating the future, one garden at a time.**
