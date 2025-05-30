import React from "react";

const PredictionResult = ({ prediction, recommendations }) => {
  return (
    <div className="mt-4 w-full max-w-md bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold">Predicted Energy Usage: {prediction} kWh</h2>
      <h3 className="mt-2 font-medium">Recommendations:</h3>
      <ul className="list-disc pl-5">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionResult;