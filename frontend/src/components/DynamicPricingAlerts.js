import React, { useState, useEffect } from "react";

const DynamicPricingAlerts = () => {
  const [currentTariff, setCurrentTariff] = useState(5.2);
  const [alertThreshold, setAlertThreshold] = useState(4.5);
  const [alerts, setAlerts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  // Simulate tariff changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Random tariff between 3.5 and 7.0
      const newTariff = (3.5 + Math.random() * 3.5).toFixed(2);
      setCurrentTariff(parseFloat(newTariff));
      
      // Check if new tariff is below threshold and create alert
      if (parseFloat(newTariff) < alertThreshold) {
        const newAlert = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          message: `Energy tariff is low (${newTariff}). Good time to run high-energy tasks!`,
          tariff: parseFloat(newTariff)
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 5)); // Keep only the 5 most recent alerts
        setShowNotification(true);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, [alertThreshold]);
  
  const handleThresholdChange = (e) => {
    setAlertThreshold(parseFloat(e.target.value));
  };
  
  return (
    <div className="mt-6 w-full max-w-lg bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Dynamic Pricing Alerts</h2>
      
      <div className="flex items-center mb-4">
        <div className="w-1/2">
          <p className="text-sm text-gray-600">Current Tariff:</p>
          <p className={`text-xl font-bold ${currentTariff < alertThreshold ? 'text-green-600' : 'text-red-600'}`}>
            ${currentTariff.toFixed(2)} / kWh
          </p>
        </div>
        
        <div className="w-1/2">
          <label className="block text-sm text-gray-600 mb-1">Alert Threshold:</label>
          <div className="flex items-center">
            <input
              type="range"
              min="3.5"
              max="7.0"
              step="0.1"
              value={alertThreshold}
              onChange={handleThresholdChange}
              className="w-2/3"
            />
            <span className="ml-2 text-sm font-medium">${alertThreshold.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Notification popup */}
      {showNotification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 animate-pulse">
          <p className="font-medium">Low Tariff Alert!</p>
          <p className="text-sm">{alerts[0]?.message}</p>
        </div>
      )}
      
      <div>
        <h3 className="text-md font-medium mb-2">Recent Alerts</h3>
        {alerts.length === 0 ? (
          <p className="text-sm text-gray-500">No recent alerts. Alerts will appear when tariff drops below threshold.</p>
        ) : (
          <div className="max-h-40 overflow-y-auto">
            {alerts.map(alert => (
              <div key={alert.id} className="border-b border-gray-200 py-2 last:border-b-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">${alert.tariff.toFixed(2)} / kWh</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-600">{alert.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicPricingAlerts;