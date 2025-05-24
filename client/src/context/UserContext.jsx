import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loginUser = (userData) => {
    setUser(userData);
  };
  const logoutUser = () => {
    setUser(null);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        if (res.data.role === "user") setUser(res.data.data);
        else setUser(null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => useContext(UserContext);