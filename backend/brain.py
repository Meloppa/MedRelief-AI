import requests

def ask_gemma(mission_type, selected_items):
    item_names = ", ".join(selected_items['Item'].tolist())
    
    prompt = f"""
    ROLE: Emergency Logistics Expert
    MISSION: {mission_type}
    LOADOUT: {item_names}
    
    TASK: Briefly explain why these items were prioritized for this specific disaster. 
    If any critical items (like Insulin or Antibiotics) are missing, warn the user.
    Keep it under 150 words.
    """
    
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "gemma", "prompt": prompt, "stream": False}
        )
        return response.json().get('response', "Error: No response from Gemma.")
    except Exception as e:
        return f"Offline Error: {str(e)}"