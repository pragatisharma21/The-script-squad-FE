/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (loginData) => {
    const data = {
      name: loginData.user.name,
      email: loginData.user.email,
      profileImage: loginData.user.profileImage,
      userId: loginData.user._id,
      token: loginData.token,
    };

    localStorage.setItem("authToken", loginData.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const localUser = localStorage.getItem("user");

    if (token && localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
