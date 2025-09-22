import React, { useState } from "react";
import { FaBolt, FaWater, FaFireAlt, FaFlask, FaWind, FaMountain } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import "../AdminDashboard.css";

const disasters = [
  { name: "Earthquake", icon: <FaMountain /> },
  { name: "Flood", icon: <FaWater /> },
  { name: "Fire", icon: <FaFireAlt /> },
  { name: "Chemical Leak", icon: <FaFlask /> },
  { name: "Cyclone", icon: <FaWind /> },
  { name: "Landslide", icon: <FaBolt /> },
];

interface OutletContext {
  incrementAlertCount: (emergency: string, message: string) => void;
  darkMode: boolean;
}

export default function MassAlerts() {
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  
  // Get the increment function and darkMode state from the outlet context
  const { incrementAlertCount, darkMode } = useOutletContext<OutletContext>();

  const sendAlert = () => {
    if (!selectedDisaster || !message) {
      setStatus("Please select a disaster and enter a message.");
      return;
    }
    
    // Increment the alert count in the parent component and add to history
    incrementAlertCount(selectedDisaster, message);
    
    setStatus(`Alert for ${selectedDisaster} sent successfully!`);
    setMessage("");
    setSelectedDisaster(null);
  };

  return (
    <div className="massalert-container">
      <div className="massalert-title">
        <MdWarning size={28} />
        Mass Alerts
      </div>

      <div className="disaster-grid">
        {disasters.map((d) => (
          <div
            key={d.name}
            className={`disaster-option ${selectedDisaster === d.name ? "selected" : ""}`}
            data-disaster={d.name}
            onClick={() => setSelectedDisaster(d.name)}
          >
            {d.icon}
            {d.name}
          </div>
        ))}
      </div>

      <textarea
        placeholder="Enter alert message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendAlert}>Send Alert</button>

      {status && <div className="massalert-status">{status}</div>}
    </div>
  );
}