import { Navigate } from "react-router-dom";
import { useClubAuth } from "./ClubContext";

const ClubProtectedRoute = ({ children }) => {
  const { club, loading } = useClubAuth();
  if (loading) return null;
  if (!club) return <Navigate to="/signin" />;
  return children;
};

export default ClubProtectedRoute;
