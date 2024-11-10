import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SessionPage from "./pages/SessionPage";
import ProfilePage from "./pages/ProfilePage";
import SessionHistoryPage from "./pages/SessionHistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session" element={<SessionPage />} /> {/* This will have an ID */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/session-history" element={<SessionHistoryPage />} />
      </Routes>
    </Router>
  )
}

export default App;