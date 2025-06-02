import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ClubContext = createContext();
export const ClubProvider = ({ children }) => {
  const [club, setClub] = useState();
  const [loading, setLoading] = useState(true);
  const [eventLoading, setEventLoading] = useState(true);
  const [clubEvents, setClubEvents] = useState([])

  const loginClub = async (clubData) => {
    setClub(clubData);
    await fetchClubEvents(clubData.username)
  };

  const logoutClub = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setClub(null);
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };
  
  const fetchClubEvents = async (clubName) =>{
    setEventLoading(true)
    try {
      const res = await axios.get("http://localhost:3000/api/club/fetchEvent",{ params:{club: clubName}, withCredentials: true})
      setClubEvents(res.data)
    } catch (err) {
      setClubEvents([])
    } finally{
      setEventLoading(false)
    }
  }

  const fetchClub = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/me", {
        withCredentials: true,
      });
      if (res.data.role === "club"){
        setClub(res.data.data);
        await fetchClubEvents(res.data.data.username);
      }
      else setClub(null);
    } catch (err) {
      setClub(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClub();
  }, []);
  return (
    <ClubContext.Provider value={{ club, clubEvents, loading, eventLoading, loginClub, logoutClub, fetchClubEvents }}>
      {children}
    </ClubContext.Provider>
  );
};
export const useClubAuth = () => useContext(ClubContext);