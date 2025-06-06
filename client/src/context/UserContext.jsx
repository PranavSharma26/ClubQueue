import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../utils/getBackendURL";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedEvents, setLikedEvents] = useState([])
  const loginUser = (userData) => {
    setUser(userData);
  };
  const logoutUser = async () => {
    try {
      await axios.post(`${backendURL}/api/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };
  const deleteUser = async () => {
    try {
      await axios.delete(`${backendURL}/api/user/deleteUser`, {
        params:{id: user.id},  
        withCredentials: true 
      });
      setUser(null);
    } catch (error) {
      console.error("Failed to Delete user:", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/me`, {
          withCredentials: true,
        });
        if (res.data.role === "user"){
          setUser(res.data.data);
          fetchLikedEvents(res.data.data.id)
        }
        else setUser(null);
      } catch (error) {
        setUser(null);
        if (error.response?.status === 401 || error.response?.status === 404) {
          console.warn("User not authenticated or not found.");
        } else {
          console.error("Failed to fetch user:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    const fetchLikedEvents = async (user_id) => {
      try {
        const res = await axios.get(`${backendURL}/api/user/fetchLikedEvents`,{
          params: {user_id},
          withCredentials: true
        })
        setLikedEvents(res.data.likedEvents)
      } catch (error) {
        setLikedEvents([])
      }
    }
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, loading, loginUser, logoutUser, deleteUser, likedEvents, setLikedEvents }}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => useContext(UserContext);