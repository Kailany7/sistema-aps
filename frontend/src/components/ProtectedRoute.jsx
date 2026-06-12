import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) return null;

  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
