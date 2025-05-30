from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

# Load trained model and scaler
with open('energy_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Function to generate energy-saving recommendations
def generate_recommendations(predicted_usage, inputs):
    recommendations = []
    # Convert string inputs to appropriate numeric types
    temperature = float(inputs['temperature'])
    equipment_usage = float(inputs['equipment_usage'])
    energy_tariff = float(inputs['energy_tariff'])
    
    if predicted_usage > 50:
        recommendations.append("Consider reducing HVAC usage during peak hours.")
    if temperature > 30:
        recommendations.append("Optimize air conditioning settings to reduce cooling costs.")
    if equipment_usage > 80:
        recommendations.append("Switch off non-essential equipment to save energy.")
    if energy_tariff > 5:
        recommendations.append("Schedule high-energy tasks during off-peak hours.")
    if not recommendations:
        recommendations.append("Your energy consumption is optimal.")
    return recommendations

@app.route('/', methods=['GET'])
def welcome():
    return jsonify({
        'message': 'Welcome to the Energy Optimization API',
        'endpoints': {
            '/predict': 'POST - Predict energy usage and get recommendations',
            '/': 'GET - This welcome message'
        },
        'status': 'online'
    })

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Convert string inputs to float for the model
    feature_values = np.array([[
        float(data['hour']), 
        float(data['day_of_week']), 
        float(data['temperature']),
        float(data['humidity']), 
        float(data['equipment_usage']), 
        float(data['energy_tariff'])
    ]])
    scaled_features = scaler.transform(feature_values)
    predicted_usage = model.predict(scaled_features)[0]
    
    recommendations = generate_recommendations(predicted_usage, data)
    
    return jsonify({
        'predicted_energy': round(predicted_usage, 2),
        'recommendations': recommendations
    })

if __name__ == '__main__':
    app.run(debug=True)