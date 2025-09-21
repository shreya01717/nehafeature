import React from 'react';
import {
  BsClipboardCheck,
  BsBarChartFill,
  BsPeopleFill,
  BsFillBellFill,
  BsFileEarmarkTextFill,
  BsFillGearFill
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
  darkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar, darkMode = false }) => {
  return (
    <aside
      id="sidebar"
      className={`sidebar ${openSidebarToggle ? "sidebar-open" : ""}`}
    >
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsClipboardCheck className='icon_header' /> DISASTER PREPAREDNESS AND MANAGEMENT
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <BsBarChartFill className='icon' /> Back
          </NavLink>
        </li>

        <li className='sidebar-list-item'>
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <BsClipboardCheck className='icon' /> Management Dashboard
          </NavLink>
        </li>


        <li className="sidebar-list-item">
          <NavLink
            to="/dashboard/admin/alerts"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active-link" : ""}`
            }
          >
            <BsFillBellFill className="icon" /> Mass Alerts
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink
            to="/dashboard/admin/alerts/history"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active-link" : ""}`
            }
          >
            📜 Mass Alert Report
          </NavLink>
        </li>

        <li className='sidebar-list-item'>
  <NavLink
    to="/dashboard/admin/compliance"  // This should match your router
    className={({ isActive }) => isActive ? "active-link" : ""}
  >
    <BsFileEarmarkTextFill className='icon' /> Compliance & Exports
  </NavLink>
</li>

      </ul>
    </aside>
  );
};

export default Sidebar;