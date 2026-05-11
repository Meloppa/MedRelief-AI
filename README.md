# 🚑 MedRelief AI: Tactical Logistics Engine

> An offline-first decision support system that optimizes medical supply allocation during disaster response using Genetic Algorithms and Gemma 4.

---

## 📖 Overview

In disaster zones such as floods, earthquakes, and conflict areas, emergency medical teams must quickly determine which medicines and equipment to bring while working under strict weight and volume constraints. These decisions are often made manually, wasting precious time during the critical "Golden Hour."

**MedRelief AI** automates this process by combining:
- 🧬 **Genetic Algorithms** to solve the multi-constraint medical loadout optimization problem.
- 🤖 **Gemma 4** running locally through [Ollama](https://ollama.com?utm_source=chatgpt.com) to explain why each item was selected.
- 💻 **Offline-first architecture** so the system works without internet access.
- 📊 **Interactive dashboard** built with [Next.js](https://nextjs.org?utm_source=chatgpt.com), [Tailwind CSS](https://tailwindcss.com?utm_source=chatgpt.com), and [FastAPI](https://fastapi.tiangolo.com?utm_source=chatgpt.com).

---

## ✨ Key Features

- 🧬 **Genetic Algorithm Optimizer**
  - Maximizes medical value while respecting weight and volume constraints.
- 🤖 **AI Mission Briefing**
  - Generates tactical explanations for selected supplies.
- 🌐 **Offline First**
  - Fully functional without internet connectivity.
- 🌍 **Scenario-Based Planning**
  - Supports earthquakes, floods, refugee camps, and disease outbreaks.
- 🛡️ **Explainable AI**
  - Transparent reasoning behind every decision.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------|
| Frontend | Next.js 14, Tailwind CSS, Lucide Icons |
| Backend | FastAPI, Python |
| Optimization | Custom Genetic Algorithm |
| AI Model | Gemma 4 |
| Local Runtime | Ollama |
| Data Processing | Pandas, NumPy |
| Visualization | Plotly |
| Deployment | Vercel, Netlify, Docker |

---

# 🛠️ Full System Installation Setup

Follow these steps to deploy MedRelief AI on your local machine.

---

## 📋 Prerequisites

Install the following tools before starting:

- **Git** – https://git-scm.com/downloads
- **Python 3.10 or higher** – https://www.python.org/downloads/
- **Node.js 18 or 20** – https://nodejs.org/
- **Ollama** – https://ollama.com/

Verify installation:

```bash
git --version
python --version
node --version
npm --version
ollama --version


📥 Step 1: Clone the Repository

git clone https://github.com/Meloppa/medrelief-ai.git
cd medrelief-ai

🤖 Step 2: Download the Gemma Model

Pull the Gemma model locally:
ollama pull gemma

You can also use gemma3:4b or another Gemma variant if your hardware supports it.

Ensure Ollama is running:
ollama serve

🐍 Step 3: Backend Setup (FastAPI)

Navigate to the backend folder:

cd backend
Create Virtual Environment

Windows
python -m venv venv
venv\Scripts\activate

macOS/Linux

python3 -m venv venv
source venv/bin/activate

Install Dependencies
pip install -r requirements.txt

Start the Backend Server
python main.py

The backend will be available at:

API Base URL: http://localhost:8000
API Docs (Swagger): http://localhost:8000/docs


⚛️ Step 4: Frontend Setup (Next.js)

Open a new terminal and navigate to the frontend directory:
cd frontend

Install Dependencies:
npm install
Start Development Server:
npm run dev

The frontend will be available at:

Dashboard: http://localhost:3000
🧪 Step 5: Verify the Installation
Open http://localhost:3000.
Set the maximum weight and volume.
Choose a disaster scenario.
Click Generate Loadout.
Confirm:
An optimized supply list is displayed.
An AI-generated Medic’s Briefing appears.