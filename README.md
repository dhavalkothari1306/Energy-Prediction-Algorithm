# Energy Optimization System

A full-stack AI-powered Energy Optimization System that predicts energy usage, provides AI-based recommendations, visualizes trends, and allows smart scheduling.

## Features

- **Energy Prediction**: Uses a trained Random Forest model to predict energy consumption based on various factors.
- **AI-Based Recommendations**: Suggests optimizations based on input values (e.g., HVAC usage, equipment scheduling).
- **Live Energy Usage Analytics**: Displays energy consumption trends with interactive graphs.
- **Smart Scheduling Interface**: Allows users to set energy-efficient schedules based on dynamic pricing.
- **Dynamic Pricing Alerts**: Notifies users when tariffs are low to optimize energy usage.

## Tech Stack

### Backend
- Flask (Python)
- Scikit-learn (Machine Learning Model)
- Flask-CORS

### Frontend
- React.js
- Tailwind CSS
- Axios
- Recharts.js

## Project Structure

```
energy-optimization-system/
├── backend/
│   ├── app.py                # Flask API
│   ├── dataset.py            # Data generation and model training
│   ├── energy_model.pkl      # Trained Random Forest model
│   ├── scaler.pkl            # StandardScaler for feature normalization
│   └── requirements.txt      # Python dependencies
│
└── frontend/
    ├── public/               # Static files
    ├── src/
    │   ├── components/
    │   │   ├── EnergyForm.js         # Form to input energy parameters
    │   │   ├── PredictionResult.js   # Display predictions and recommendations
    │   │   ├── EnergyChart.js        # Visualization of energy usage
    │   │   ├── SmartScheduling.js    # Smart scheduling interface
    │   │   └── DynamicPricingAlerts.js # Dynamic pricing alerts
    │   ├── App.js            # Main React component
    │   ├── index.js          # React entry point
    │   └── styles.css        # CSS styles with Tailwind
    ├── package.json          # Node.js dependencies
    └── tailwind.config.js    # Tailwind CSS configuration
```

## Installation and Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```
   python app.py
   ```
   The server will start at http://127.0.0.1:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open at http://localhost:3000

## Usage

1. Enter the required parameters in the Energy Form:
   - Hour of day (0-23)
   - Day of week (0-6, where 0 is Monday)
   - Temperature (in °C)
   - Humidity (%)
   - Equipment usage (%)
   - Energy tariff (price per kWh)

2. Click "Get Prediction" to receive energy usage predictions and recommendations.

3. View energy usage trends in the chart.

4. Use the Smart Scheduling tab to set up energy-efficient schedules.

5. Monitor Dynamic Pricing Alerts for optimal energy usage times.

## License

MIT
