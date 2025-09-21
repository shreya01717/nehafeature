import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  BsClipboardCheck,
  BsPeopleFill,
 BsFileEarmarkTextFill,
  BsFillBellFill,
  BsMoon,
  BsSun
} from "react-icons/bs";
import "../AdminDashboard.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

interface AlertRecord {
  id: number;
  timestamp: Date;
  emergency: string;
  message: string;
}

interface AdminDashboardProps {
  alerts: any[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ alerts: initialAlerts }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [alertHistory, setAlertHistory] = useState<AlertRecord[]>([]);

  const location = useLocation();
  const isMassAlertsPage = location.pathname.includes("/dashboard/admin/alerts");
  const isHistoryPage = location.pathname.includes("/dashboard/admin/alerts/history");


  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(darkMode ? "dark-theme" : "light-theme");
  }, [darkMode]);

  // Function to increment the alert count and add to history
  const incrementAlertCount = (emergency: string, message: string) => {
    const newAlert: AlertRecord = {
      id: Date.now(),
      timestamp: new Date(),
      emergency,
      message
    };
    
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    setAlertHistory(prevHistory => [newAlert, ...prevHistory]);
  };

  // Function to clear all alerts and history
  const clearAllAlerts = () => {
    setAlerts([]);
    setAlertHistory([]);
  };

  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const drillData = [
    { month: 'Jan', participation: 65 },
    { month: 'Feb', participation: 72 },
    { month: 'Mar', participation: 80 },
    { month: 'Apr', participation: 74 },
    { month: 'May', participation: 90 },
  ];

  const preparednessData = [
    { class: 'Class 6', score: 70 },
    { class: 'Class 7', score: 78 },
    { class: 'Class 8', score: 82 },
    { class: 'Class 9', score: 75 },
    { class: 'Class 10', score: 88 },
  ];

  return (
    <div className="grid-container">
      <Sidebar openSidebarToggle={openSidebar} OpenSidebar={toggleSidebar} darkMode={darkMode} />

      <header className="header">
        <span className="menu-icon" onClick={toggleSidebar}>☰</span>
        <h1>Admin Dashboard</h1>
        <button className="darkmode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
      </header>

      <main className="main-container">
        {!isMassAlertsPage && !isHistoryPage && (
          <>
            <div className='main-title'>
              <h3>Welcome, Head Faculty!</h3>
            </div>
            <div className='main-cards'>
              <div className='card'>
                <div className='card-inner'>
                  <h3>MANAGEMENT DASHBOARD</h3>
                  <BsClipboardCheck className='card_icon'/>
                </div>
                <h1>87%</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>AVERAGE PREPAREDNESS</h3>
                  <BsPeopleFill className='card_icon'/>
                </div>
                <h1>76%</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>COMPLIANCE REPORTS</h3>
                  <BsFileEarmarkTextFill className='card_icon'/>
                </div>
                <h1>124</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>MASS ALERTS</h3>
                  <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{alerts.length}</h1>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-box">
                <h4 className="chart-title">DRILL PARTICIPATION</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={drillData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="participation" stroke="#8884d8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-box">
                <h4 className="chart-title">AVERAGE PREPAREDNESS BY CLASS</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={preparednessData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        {/* Pass the functions, darkMode state, and alertHistory to the Outlet */}
        <Outlet context={{ 
            incrementAlertCount, 
            darkMode, 
            alertHistory, 
            setAlertHistory,
            clearAllAlerts
        }} />
        
      </main>
    </div>
  );
};

export default AdminDashboard;