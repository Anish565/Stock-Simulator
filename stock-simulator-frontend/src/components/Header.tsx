import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <header className="w-full bg-[#8b4242] p-4 text-white flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center"><h1 className="text-xl ml-4">Stock Simulator</h1></Link>
            <Link to={isLoginPage ? "/register" : "/login"} className="mr-4 text-white hover:underline">
            {isLoginPage ? "Register" : "Login"}
            </Link>
        </header>
    );
};

export default Header;