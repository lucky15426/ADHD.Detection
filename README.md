# ADHD Vision — Advanced Assessment Web App

A full-stack application for ADHD behavioral pattern prediction using Machine Learning (FastAPI + React).

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.9+ 
- Node.js 18+ (npm)

---

### 2. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. (Optional) Retrain the model (the model is already pre-trained):
   ```bash
   python train_model.py
   ```
4. Start the API server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run on [http://localhost:8000](http://localhost:8000).

---

### 3. Frontend Setup (React + Vite)

1. Open a **new** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Features
- **Multi-step Assessment**: Validated behavioral metrics collection (Focus, Hyperactivity, Lifestyle).
- **AI Prediction**: Custom RandomForest model trained on behavioral signatures.
- **Dynamic Visualization**: Radar charts and probability gauges for clear feedback.
- **Modern UI**: Built with Tailwind CSS, Framer Motion, and Lucide icons.
- **Future Ready**: Pluggable architecture for recommendation engines.

## 📁 Project Structure
- `/backend`: FastAPI application, model logic, and training scripts.
- `/frontend`: React source code, components, services, and styles.
