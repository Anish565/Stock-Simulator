import React from "react";

interface SessionModalProps {
  onClose: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ onClose }) => {
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
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Starting Funds"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Target Value"
            className="w-full px-3 py-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Duration"
            className="w-full px-3 py-2 rounded text-black"
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
