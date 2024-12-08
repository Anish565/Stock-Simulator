import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check for authentication token in localStorage or sessionStorage
  const token = localStorage.getItem('refreshToken');
  

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;