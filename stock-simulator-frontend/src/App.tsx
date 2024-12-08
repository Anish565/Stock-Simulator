import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SessionPage from "./pages/SessionPage";
import ProfilePage from "./pages/ProfilePage";
import SessionHistoryPage from "./pages/SessionHistoryPage";
import MFA from "./pages/MFA";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />  
        <Route path="/session/:id?" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} /> {/* This will have an ID */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/session-history" element={<ProtectedRoute><SessionHistoryPage /></ProtectedRoute>} />
        <Route path="/mfa" element={<MFA />} />
      </Routes>
    </Router>
  )
}

export default App;