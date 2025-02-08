// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState({});

//   const login = async (loginData) => {
//     const data = {
//       name: loginData.user.name,
//       email: loginData.user.email,
//       profileImage: loginData.user.profileImage,
//       userId: loginData.user._id,
//       token: loginData.token,
//     };

//     localStorage.setItem("authToken", loginData.token);
//     localStorage.setItem("user", JSON.stringify(data));

//     setUser(data);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     setUserData({})
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const localUser = localStorage.getItem("user");

//     if (token && localUser) {
//       try {
//         const parsedUser = JSON.parse(localUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("user");
//       }
//     }
//     setLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, userData, setUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };



/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

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
    setUserData({});
  };

  const updateUser = (updatedUserData) => {
    // Merge the current user data with the updated fields
    const updatedUser = {
      ...user,
      ...updatedUserData,
    };

    // Update the local storage and state with the new user data
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
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
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
