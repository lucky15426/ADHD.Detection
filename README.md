---
title: ADHD Detection System
emoji: 🧠
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# ADHD Detection System (Backend)

This is the FastAPI backend for the ADHD Detection System, featuring a Hybrid CNN-LSTM Neural Network for linguistic analysis and a Random Forest model for behavioral assessment.

## Deployment Details

- **Framework**: FastAPI
- **Model**: CNN + LSTM (TensorFlow)
- **Deployment Platform**: Hugging Face Spaces (Docker)
- **Frontend**: Vercel

## API Endpoints

- `POST /predict`: Submit behavioral data and journal text for ADHD assessment.
- `POST /recommend`: Get IKS-based wellness recommendations.
- `GET /health`: Service health check.

## Setup for Hugging Face

This Space is configured to run the `backend` directory using the provided `Dockerfile`. It listens on port **7860**.
