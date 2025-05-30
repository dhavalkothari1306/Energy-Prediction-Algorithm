import React, { useState } from "react";

const EnergyForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    hour: "",
    day_of_week: "",
    temperature: "",
    humidity: "",
    equipment_usage: "",
    energy_tariff: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form className="grid grid-cols-2 gap-4 max-w-md" onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          type="number"
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={key.replace("_", " ").toUpperCase()}
          className="border p-2 rounded"
          required
        />
      ))}
      <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
        Get Prediction
      </button>
    </form>
  );
};

export default EnergyForm;