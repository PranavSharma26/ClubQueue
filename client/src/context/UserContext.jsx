import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        if (res.data.role === "user"){
          setUser(res.data.data);
          fetchLikedEvents(res.data.data.id)
        }
        else setUser(null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    const fetchLikedEvents = async (user_id) => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/fetchLikedEvents',{
          params: {user_id},
          withCredentials: true
        })
        setLikedEvents(res.data.likedEvents)
      } catch (error) {
        setLikedEvents([])
      }
      finally{
        setLoading(false)
      }
    }
    fetchUser();
  }, [user]);
  return (
    <UserContext.Provider value={{ user, loading, loginUser, logoutUser, likedEvents, setLikedEvents }}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => useContext(UserContext);