import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft, faUserCircle, faHome, faUser, faHistory } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  profileImageUrl?: string; // Optional URL for profile image
}



const Sidebar: React.FC<SidebarProps> = ({ profileImageUrl }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-500 ease-in-out bg-gray-900 min-h-screen flex flex-col sticky top-0 left-0 shadow-lg overflow-hidden`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-4 absolute top-0 left-0 text-gray-400 hover:text-white transition-colors"
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faArrowLeft : faBars} size="lg" />
      </button>

      {/* Main Navigation */}
      <div className={`flex-grow mt-16 ${isSidebarOpen ? "px-6" : "px-2"} space-y-6`}>
        <div className={`${!isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-300`}>
          <h2 className="text-xl font-bold text-white/90 mb-8">Stock Simulator</h2>
        </div>
        
        <nav className="space-y-4">
          <Link to="/dashboard" 
            className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg p-2 transition-all">
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
            <span className={`ml-3 ${!isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-300`}>
              Home
            </span>
          </Link>
          <Link to="/profile" 
            className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg p-2 transition-all">
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            <span className={`ml-3 ${!isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-300`}>
              Profile
            </span>
          </Link>
          <Link to="/session-history" 
            className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg p-2 transition-all">
            <FontAwesomeIcon icon={faHistory} className="w-5 h-5" />
            <span className={`ml-3 ${!isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-300`}>
              Session History
            </span>
          </Link>
        </nav>
      </div>

      {/* Profile Section */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center space-x-3">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-700"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-gray-400" />
          )}
          <span className={`${!isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-300`}>
            <button className="text-gray-400 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
