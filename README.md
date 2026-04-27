# Rapid Crisis Response

**PulseCore** is a state-of-the-art crisis monitoring and reporting system designed for rapid response teams to handle emergencies with precision and speed.

![System Status](https://img.shields.io/badge/System-Active-red?style=for-the-badge)
![Security](https://img.shields.io/badge/Access-Restricted-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)

## 🔴 Core Capabilities

- **Live Incident Feed**: Monitor emergencies as they happen with a high-performance data stream.
- **Rapid Dispatching**: Report incidents instantly with precise location and situational details.
- **Advanced Filtering**: Quickly search through incident history to identify patterns or prioritize responses.
- **Mission-Critical Design**: A high-contrast, dark-mode interface optimized for low-light command centers.

## 🚀 Deployment (Vercel Ready)

PulseCore is now fully optimized for **Vercel** deployment. The backend logic is integrated into Next.js API routes (`pages/api/reports.js`), allowing for a seamless, single-command setup.

### Local Setup

1. **Initialize Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Navigate to [http://localhost:3001](http://localhost:3001).

---
**Note:** The separate `backend` folder is kept for architectural reference but is no longer required for the live deployment.

## 🧠 System Architecture

PulseCore uses a distributed architecture to ensure maximum uptime:
- **Core Engine**: Express.js API handling mission-critical data.
- **Intelligence Layer**: Next.js 14 frontend providing real-time situational awareness.
- **Data Integrity**: In-memory storage optimized for rapid read/write cycles.

## 🔐 Security Notice

This dashboard is part of a restricted crisis response network. Ensure all deployments follow local security protocols.

---
Developed by [PulseCore Systems](https://github.com/srijeetcoder)
