/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (
    userData?.userType &&
    userData.userType !== "DEFAULT" &&
    userData.userType !== "FLEET_ADMIN" &&
    userData.userType !== "FLEET_PENDING"
  ) {
    return <Navigate to="/adminDashboard" />;
  }

  return children;
};

export default PrivateRoute;
