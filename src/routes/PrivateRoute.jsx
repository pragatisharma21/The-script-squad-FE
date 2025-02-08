/* eslint-disable react/prop-types */
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;