import React, { useState } from "react";
import axios from "axios";
import EnergyForm from "./components/EnergyForm";
import PredictionResult from "./components/PredictionResult";
import EnergyChart from "./components/EnergyChart";
import SmartScheduling from "./components/SmartScheduling";
import DynamicPricingAlerts from "./components/DynamicPricingAlerts";

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [usageHistory, setUsageHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handlePrediction = async (formData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(response.data.predicted_energy);
      setRecommendations(response.data.recommendations);
      setUsageHistory([...usageHistory, { hour: formData.hour, energy: response.data.predicted_energy }]);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
              <div>
                <EnergyForm onPredict={handlePrediction} />
                {prediction !== null && <PredictionResult prediction={prediction} recommendations={recommendations} />}
              </div>
              <div>
                <EnergyChart usageHistory={usageHistory} />
                <DynamicPricingAlerts />
              </div>
            </div>
          </>
        );
      case "scheduling":
        return <SmartScheduling />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Energy Optimization Dashboard</h1>
        </div>
      </header>
      
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex space-x-4 p-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded ${
                activeTab === "dashboard" 
                  ? "bg-blue-100 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("scheduling")}
              className={`px-4 py-2 rounded ${
                activeTab === "scheduling" 
                  ? "bg-blue-100 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Smart Scheduling
            </button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-6">
        {renderTabContent()}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>Energy Optimization System &copy; 2023</p>
        </div>
      </footer>
    </div>
  );
};

export default App;