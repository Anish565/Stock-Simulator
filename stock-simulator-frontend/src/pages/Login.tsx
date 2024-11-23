import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { loginUser, fetchQRCode } from "../utils/apiService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Login Form */}
      <div className="mt-8 p-6 bg-[#8b4242] rounded-lg shadow-lg w-full max-w-sm text-white">
        <h2 className="text-center text-lg mb-4">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 rounded text-black"
          />

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#5e4b8b] text-white hover:bg-[#4a3b72] transition"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
