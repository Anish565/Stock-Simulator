import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../utils/apiService";

interface SessionModalProps {
  onClose: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [startAmount, setStartAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userId = "testUser"; // Replace with dynamic userId if available

    try {
      const response = await createSession(
        name,
        parseFloat(startAmount),
        parseFloat(targetAmount),
        duration,
        userId
      );

      const { sessionId: createdSessionId } = JSON.parse(response.body);
      console.log("Session created successfully. Session ID:", createdSessionId);

      // Navigate to /session
      navigate("/session");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#8b4242] p-6 rounded-lg w-80">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-center text-white mb-4">Session Info</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
            required
          />
          <input
            type="number"
            placeholder="Starting Funds"
            value={startAmount}
            onChange={(e) => setStartAmount(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
            required
          />
          <input
            type="number"
            placeholder="Target Value"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
            required
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#5e4b8b] text-white rounded-md hover:bg-[#4a3b72] transition"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
