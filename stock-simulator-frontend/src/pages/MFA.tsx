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
        localStorage.setItem("accessToken", tokens.AccessToken);
        localStorage.setItem("idToken", tokens.IdToken);
        localStorage.setItem("refreshToken", tokens.RefreshToken);

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
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />

      <h1 className="text-lg font-bold mt-8">MFA Required</h1>

      {challengeName === "MFA_SETUP" ? (
        <div className="mt-4 text-center">
          <p>Scan this QR code with your authenticator app:</p>
          <div className="mt-4">
            {/* Render the QR code */}
            <QRCodeSVG value={qrUrl} size={160} />
          </div>
          <p className="mt-4 text-black">
            Secret Code: <span className="font-mono">{secretCode}</span>
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP from Authenticator App"
              className="w-full px-3 py-2 rounded text-black"
            />
            <button
              type="submit"
              className={`w-full py-2 rounded ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#5e4b8b] text-white hover:bg-[#4a3b72] transition"
              }`}
              disabled={loading}
            >
              {loading ? "Setting Up..." : "Setup MFA"}
            </button>
          </form>
        </div>
      ) : challengeName === "SOFTWARE_TOKEN_MFA" ? (
        <div className="mt-4">
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 rounded text-black"
            />
            <button
              type="submit"
              className={`w-full py-2 rounded ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#5e4b8b] text-white hover:bg-[#4a3b72] transition"
              }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify and Login"}
            </button>
          </form>
        </div>
      ) : (
        <p className="mt-4">Invalid MFA challenge.</p>
      )}
    </div>
  );
};

export default Mfa;
