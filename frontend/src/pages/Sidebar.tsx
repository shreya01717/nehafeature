import React from "react";
import {
  BsClipboardCheck,
  BsBarChartFill,
  BsPeopleFill,
  BsFillBellFill,
  BsFileEarmarkTextFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
  darkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar, darkMode = false }) => {
  return (
    <aside
      id="sidebar"
      className={`sidebar ${openSidebarToggle ? "sidebar-open" : ""} ${darkMode ? "dark" : ""}`}
    >
      {/* Sidebar Header */}
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsClipboardCheck className="icon_header" /> DISASTER PREPAREDNESS AND MANAGEMENT
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
            <BsBarChartFill className="icon" /> Back
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/dashboard/admin" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
            <BsClipboardCheck className="icon" /> Management Dashboard
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/dashboard/admin/alerts" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
            <BsFillBellFill className="icon" /> Mass Alerts
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/dashboard/admin/alerts/history" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
            📜 Mass Alert Report
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/dashboard/admin/compliance" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
            <BsFileEarmarkTextFill className="icon" /> Compliance & Exports
          </NavLink>
        </li>

        {/* Learning Modules */}
        <li className="sidebar-list-item">
          <NavLink to="/dashboard/modules" className={({ isActive }) => (isActive ? "active-link" : "sidebar-link")}>
            <BsPeopleFill className="icon" /> Learning Modules
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
