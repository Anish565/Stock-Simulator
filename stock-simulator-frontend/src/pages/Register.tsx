import React from "react";
import Header from "../components/Header";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Registration Form */}
      <div className="mt-8 p-6 bg-[#8b4242] rounded-lg shadow-lg w-full max-w-sm text-white">
        <h2 className="text-center text-lg mb-4">Register</h2>
        
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="password"
            placeholder="Retype Password"
            className="w-full px-3 py-2 rounded text-black"
          />

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 rounded bg-[#5e4b8b] text-white hover:bg-[#4a3b72] transition"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
