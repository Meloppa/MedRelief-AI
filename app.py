import streamlit as st
import pandas as pd
from backend.optimizer import MedicalGA
from backend.brain import ask_gemma

st.set_page_config(page_title="MedRelief AI", layout="wide")
st.title("🚑 MedRelief AI: Offline Disaster Logistics")

# Sidebar - Inputs
st.sidebar.header("Mission Parameters")
mission = st.sidebar.selectbox("Mission Type", ["Flood", "Earthquake", "Refugee Camp"])
w_limit = st.sidebar.slider("Weight Limit (kg)", 50, 500, 200)
v_limit = st.sidebar.slider("Volume Limit (L)", 50, 500, 200)

# Load Data
df = pd.read_csv("inventory.csv")

if st.button("Optimize Supply Manifest"):
    # Run GA
    ga = MedicalGA(df, w_limit, v_limit)
    best_loadout_bits = ga.solve()
    
    selected_df = df[best_loadout_bits == 1]
    
    # UI Layout
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Optimal Packing List")
        st.dataframe(selected_df)
        st.metric("Total Weight", f"{selected_df['Weight (kg)'].sum()} kg")
        
    with col2:
        st.subheader("Gemma 4 Decision Support")
        with st.spinner("Analyzing manifest..."):
            explanation = ask_gemma(mission, selected_df)
            st.write(explanation)