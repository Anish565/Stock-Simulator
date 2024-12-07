import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // Backend server URL

export default function useWebSocket() {
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL); // Connect to WebSocket server

    // Listen for 'stock-update' events
    socket.on("stock-update", (data) => {
      console.log("Stock Update:", data); // Log the data received from the server
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on mount
}
