import React, { useState } from "react";

const SmartScheduling = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, device: "HVAC", startTime: "08:00", endTime: "17:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    { id: 2, device: "Lighting", startTime: "07:00", endTime: "18:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] }
  ]);
  
  const [newSchedule, setNewSchedule] = useState({
    device: "",
    startTime: "",
    endTime: "",
    days: []
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const deviceOptions = ["HVAC", "Lighting", "Manufacturing Equipment", "Office Equipment", "Server Room"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleDayToggle = (day) => {
    const updatedDays = newSchedule.days.includes(day)
      ? newSchedule.days.filter(d => d !== day)
      : [...newSchedule.days, day];
    setNewSchedule({ ...newSchedule, days: updatedDays });
  };

  const handleAddSchedule = () => {
    if (!newSchedule.device || !newSchedule.startTime || !newSchedule.endTime || newSchedule.days.length === 0) {
      alert("Please fill in all fields and select at least one day");
      return;
    }
    
    const newId = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
    setSchedules([...schedules, { ...newSchedule, id: newId }]);
    setNewSchedule({
      device: "",
      startTime: "",
      endTime: "",
      days: []
    });
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Smart Energy Scheduling</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Schedule</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Device</label>
            <select
              name="device"
              value={newSchedule.device}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Device</option>
              {deviceOptions.map(device => (
                <option key={device} value={device}>{device}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-2 py-1 text-xs rounded ${newSchedule.days.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={newSchedule.startTime}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={newSchedule.endTime}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        
        <button
          onClick={handleAddSchedule}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Schedule
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Current Schedules</h3>
        
        {schedules.length === 0 ? (
          <p className="text-gray-500">No schedules yet. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedules.map(schedule => (
                  <tr key={schedule.id}>
                    <td className="px-4 py-2">{schedule.device}</td>
                    <td className="px-4 py-2">{schedule.days.join(", ")}</td>
                    <td className="px-4 py-2">{schedule.startTime} - {schedule.endTime}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartScheduling;