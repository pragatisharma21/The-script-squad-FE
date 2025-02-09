/* eslint-disable react/prop-types */
import { getUserProfile } from "@/Api/userService";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const login = async (loginData) => {
    const data = {
      name: loginData.user.name,
      email: loginData.user.email,
      profileImage: loginData.user.profileImage,
      userId: loginData.user._id,
      token: loginData.token,
      userType: loginData.userType,
    };

    localStorage.setItem("authToken", loginData.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);

    fetchUser(loginData.user._id);
  };

  const fetchUser = async (userId) => {
    try {
      const res = await getUserProfile(userId);
      console.log(res)
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserData({});
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const localUser = localStorage.getItem("user");

    if (token && localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
        fetchUser(parsedUser.userId);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, userData, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
