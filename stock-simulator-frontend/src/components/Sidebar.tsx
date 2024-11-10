import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface SidebarProps {
  profileImageUrl?: string; // Optional URL for profile image
}

const Sidebar: React.FC<SidebarProps> = ({ profileImageUrl }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-48" : "w-12"
      } transition-width duration-300 bg-[#8b4242] text-white flex flex-col relative`}
    >
      {/* Toggle Button at Top-Left */}
      <button onClick={toggleSidebar} className="p-4 absolute top-0 left-0">
        <FontAwesomeIcon icon={isSidebarOpen ? faArrowLeft : faBars} size="lg" />
      </button>

      {/* Sidebar Content - Links at the Top */}
      <div className={`flex-grow mt-16 ${isSidebarOpen ? "pl-4 pr-4" : "px-0"} space-y-4`}>
        {isSidebarOpen && (
          <div>
            <h2 className="text-lg font-semibold">Stock Simulator</h2>
            <nav className="space-y-2 mt-4">
              <Link to="/dashboard" className="block">Home</Link>
              <Link to="/profile" className="block">Profile</Link>
              <Link to="/session-history" className="block">Session History</Link>
            </nav>
          </div>
        )}
      </div>

      {/* Profile Icon and Sign Out Button at Bottom */}
      <div className="flex items-center justify-center p-4 space-x-4 absolute bottom-4 left-0 w-full">
      {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        )}
        {isSidebarOpen && (
          <div className="flex items-center space-x-2">
            <button className="text-left">Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
