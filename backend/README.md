---
title: ADHD Assessment API
emoji: 🚀
colorFrom: pink
colorTo: indigo
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# ADHD Assessment API - Hybrid CNN+LSTM

This space hosts the backend for the ADHD Assessment project.
- **Backend**: FastAPI
- **Model**: CNN + LSTM Hybrid Neural Network
- **Frontend**: React (Vercel)

## API Endpoints:

- `POST /predict`: Submit assessment data for ADHD likelihood prediction.
- `POST /recommend`: Get IKS (Indian Knowledge Systems) recommendations.
- `GET /health`: Check if the service is running.
