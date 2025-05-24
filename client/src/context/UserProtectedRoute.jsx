import { Navigate } from "react-router-dom";
import { useAuth } from "./UserContext";

const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/signin" />;
  return children;
};

export default UserProtectedRoute;
