import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FaSearch, FaTrash, FaFilter } from "react-icons/fa";
import "../AdminDashboard.css";

interface AlertRecord {
  id: number;
  timestamp: Date;
  emergency: string;
  message: string;
}

interface OutletContext {
  darkMode: boolean;
  alertHistory: AlertRecord[];
  setAlertHistory: React.Dispatch<React.SetStateAction<AlertRecord[]>>;
  clearAllAlerts: () => void;
}

export default function MassAlertHistory() {
  const { darkMode, alertHistory, setAlertHistory, clearAllAlerts } = useOutletContext<OutletContext>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmergency, setFilterEmergency] = useState("All");
  const [filteredAlerts, setFilteredAlerts] = useState<AlertRecord[]>([]);

  // Get unique emergency types for filter dropdown
  const emergencyTypes = ["All", ...new Set(alertHistory.map(alert => alert.emergency))];

  // Filter alerts based on search term and emergency type
  useEffect(() => {
    let results = alertHistory;
    
    // Filter by emergency type
    if (filterEmergency !== "All") {
      results = results.filter(alert => alert.emergency === filterEmergency);
    }
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(alert => 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.emergency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by timestamp (newest first)
    results = results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setFilteredAlerts(results);
  }, [alertHistory, searchTerm, filterEmergency]);

  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all alert history? This action cannot be undone.")) {
      clearAllAlerts(); // This will clear both history and alert count
    }
  };

  const deleteAlert = (id: number) => {
    setAlertHistory(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="massalert-history-container">
      <div className="history-header">
        <h2>Mass Alert History</h2>
        <button 
          className="clear-history-btn"
          onClick={handleClearHistory}
          disabled={alertHistory.length === 0}
        >
          <FaTrash /> Clear All History
        </button>
      </div>

      <div className="history-filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-box">
          <FaFilter />
          <select
            value={filterEmergency}
            onChange={(e) => setFilterEmergency(e.target.value)}
          >
            {emergencyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredAlerts.length > 0 ? (
        <div className="alerts-table-container">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Emergency Type</th>
                <th>Alert Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map(alert => (
                <tr key={alert.id}>
                  <td>{formatDate(alert.timestamp)}</td>
                  <td>
                    <span className="emergency-badge">{alert.emergency}</span>
                  </td>
                  <td className="alert-message">{alert.message}</td>
                  <td>
                    <button 
                      className="delete-alert-btn"
                      onClick={() => deleteAlert(alert.id)}
                      title="Delete this alert"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-alerts">
          {alertHistory.length === 0 ? (
            <p>No alerts have been sent yet.</p>
          ) : (
            <p>No alerts match your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}