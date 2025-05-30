import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pickle

# -------------------------------------
# Step 1: Generate Synthetic Data
# -------------------------------------
np.random.seed(42)
n_samples = 100
data = {
    'hour': np.random.randint(0, 24, size=n_samples),
    'day_of_week': np.random.randint(0, 7, size=n_samples),
    'temperature': np.random.uniform(15, 45, size=n_samples),
    'humidity': np.random.uniform(30, 90, size=n_samples),
    'equipment_usage': np.random.uniform(10, 100, size=n_samples),
    'energy_tariff': np.random.uniform(3, 8, size=n_samples),
}
df = pd.DataFrame(data)

# Add the target variable
df['energy_usage'] = (
    0.5 * df['temperature'] +
    0.3 * df['humidity'] +
    0.4 * df['equipment_usage'] +
    np.random.uniform(0, 20, size=n_samples)
)

# Define features and target
features = ['hour', 'day_of_week', 'temperature', 'humidity', 'equipment_usage', 'energy_tariff']
target = 'energy_usage'

X = df[features]
y = df[target]

# -------------------------------------
# Step 2: Scale the Data
# -------------------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# -------------------------------------
# Step 3: Split the Data
# -------------------------------------
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# -------------------------------------
# Step 4: Train the Model
# -------------------------------------
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# -------------------------------------
# Step 5: Save the Model and Scaler
# -------------------------------------
with open('energy_model.pkl', 'wb') as file:
    pickle.dump(model, file)

with open('scaler.pkl', 'wb') as file:
    pickle.dump(scaler, file)

# -------------------------------------
# Step 6: Load the Model and Scaler for Testing
# -------------------------------------
with open('energy_model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

with open('scaler.pkl', 'rb') as file:
    loaded_scaler = pickle.load(file)

# -------------------------------------
# Step 7: Test the Model with a Sample Input
# -------------------------------------
# Define a consistent sample input with 6 features
sample_input = [[15, 2, 30, 65, 70, 5]]  # [hour, day_of_week, temperature, humidity, equipment_usage, energy_tariff]

# Convert sample input to DataFrame with correct feature names
sample_input_df = pd.DataFrame(sample_input, columns=features)

# Scale the input using the loaded scaler
sample_scaled = loaded_scaler.transform(sample_input_df)

# Predict energy usage
prediction = loaded_model.predict(sample_scaled)
print(f"Predicted Energy Usage: {prediction[0]:.2f} kWh")