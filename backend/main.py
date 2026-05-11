from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from optimizer import MedicalGA
from brain import ask_gemma

app = FastAPI()

# Allow your frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/optimize")
async def optimize(data: dict):
    # Get inputs from Frontend
    weight_limit = data.get("weight_limit", 500)
    volume_limit = data.get("volume_limit", 500)
    mission_type = data.get("mission_type", "Flood")
    
    # Run GA
    df = pd.read_csv("inventory.csv")
    ga = MedicalGA(df, weight_limit, volume_limit)
    best_bits = ga.solve()
    selected_items = df[best_bits == 1]
    
    # Get Gemma's logic
    explanation = ask_gemma(mission_type, selected_items)
    
    return {
        "items": selected_items.to_dict(orient="records"),
        "total_weight": float(selected_items['Weight (kg)'].sum()),
        "explanation": explanation
    }