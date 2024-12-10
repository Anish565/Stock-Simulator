import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { loginUser, fetchQRCode } from "../utils/apiService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useWebSocket();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(username, password);

      console.log("Login response:", response);

      if (response.challengeName === "MFA_SETUP") {
        console.log("MFA Setup required. Fetching QR code...");
        const qrResponse = await fetchQRCode(response.session, "StockSimulator", username);

        console.log("QR code response:", qrResponse);

        // Redirect to MFA page with QR URL, session, and secret code
        navigate("/mfa", {
          state: {
            challengeName: response.challengeName,
            session: qrResponse.session,
            qrUrl: qrResponse.QRUrl,
            secretCode: qrResponse.secretCode,
            username, // Pass the username to MFA page
          },
        });
      } else if (response.challengeName === "SOFTWARE_TOKEN_MFA") {
        console.log("Software token MFA required.");
        navigate("/mfa", {
          state: {
            challengeName: response.challengeName,
            session: response.session,
            username, // Pass the username to MFA page
          },
        });
      } else {
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-sm text-white border border-white/10">
          <h2 className="text-center text-2xl font-bold mb-6">Welcome Back</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all text-white"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Input Group */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all text-white pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 active:scale-[0.98]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
