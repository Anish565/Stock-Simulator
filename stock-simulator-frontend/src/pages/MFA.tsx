import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyMFA, completeLoginWithMFA } from "../utils/apiService";
import { QRCodeSVG } from "qrcode.react";

const Mfa: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { challengeName, qrUrl, secretCode, session, username } = location.state || {}; // Get username from state

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP!");
      return;
    }

    try {
      setLoading(true);
      if (challengeName === "MFA_SETUP") {
        // Handle MFA setup
        await verifyMFA(session, otp, username); // Use dynamic username
        toast.success("MFA setup successfully!");
        navigate("/login");
      } else if (challengeName === "SOFTWARE_TOKEN_MFA") {
        // Handle software token MFA login
        const clientId = import.meta.env.VITE_CLIENT_ID; // Hardcoded for now
        const response = await completeLoginWithMFA(session, clientId, username, otp); // Use dynamic username

        console.log("Login Complete Response:", response);

        // Save tokens to localStorage
        const tokens = response.tokens; // Access the tokens from the response
        sessionStorage.setItem("accessToken", tokens.AccessToken); // this lasts for 1 hour
        sessionStorage.setItem("idToken", tokens.IdToken);  // this lasts for 1 hour
        localStorage.setItem("refreshToken", tokens.RefreshToken); // this lasts for 30 days

        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to verify MFA. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <ToastContainer position="top-center" autoClose={2000} />

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {challengeName === "MFA_SETUP" ? "Set Up Two-Factor Authentication" : "Two-Factor Authentication"}
        </h1>

        {challengeName === "MFA_SETUP" ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Scan this QR code with your authenticator app:</p>
              <div className="inline-block p-4 bg-gray-50 rounded-lg">
                <QRCodeSVG value={qrUrl} size={160} />
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleOtpSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter verification code"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Complete Setup"}
              </button>
            </form>
          </div>
        ) : challengeName === "SOFTWARE_TOKEN_MFA" ? (
          <form className="space-y-4" onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Sign In"}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-600">Invalid authentication challenge.</p>
        )}
      </div>
    </div>
  );
};

export default Mfa;
