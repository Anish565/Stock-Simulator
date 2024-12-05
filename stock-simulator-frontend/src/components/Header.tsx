import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <header className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] p-4 text-white flex justify-between items-center shadow-xl fixed top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-white/10">
            <Link 
                to="/dashboard" 
                className="flex items-center transition-all duration-300 hover:scale-105 hover:text-emerald-400"
            >
                <h1 className="text-2xl font-bold ml-4 tracking-wider">
                    Stock Simulator
                </h1>
            </Link>
            
            <Link 
                to={isLoginPage ? "/register" : "/login"} 
                className="mr-4 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 ease-in-out"
            >
                {isLoginPage ? "Register" : "Login"}
            </Link>
        </header>
    );
};

export default Header;