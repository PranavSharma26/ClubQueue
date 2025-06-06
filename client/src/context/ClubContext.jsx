import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {backendURL} from '../utils/getBackendURL'

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
      await axios.post(`${backendURL}/api/logout`, {}, { withCredentials: true });
      setClub(null);
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };
  const deleteClub = async () => {
    try {
      await axios.delete(`${backendURL}/api/club/deleteClub`, {
        params:{id: club.id}, 
        withCredentials: true 
      });
      setClub(null);
    } catch (error) {
      console.error("Failed to delete club:", error);
    }
  };
  
  const fetchClubEvents = async (clubName) =>{
    setEventLoading(true)
    try {
      const res = await axios.get(`${backendURL}/api/club/fetchEvent`,{ params:{club: clubName}, withCredentials: true})
      setClubEvents(res.data)
    } catch (err) {
      setClubEvents([])
    } finally{
      setEventLoading(false)
    }
  }

  const fetchClub = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/me`, {
        withCredentials: true,
      });
      if (res.data.role === "club"){
        setClub(res.data.data);
        await fetchClubEvents(res.data.data.username);
      }
      else setClub(null);
    } catch (error) {
      setClub(null);
      if (error.response?.status === 401 || error.response?.status === 404) {
        console.warn("User not authenticated or not found.");
      } else {
        console.error("Failed to fetch user:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClub();
  }, []);
  return (
    <ClubContext.Provider value={{ club, clubEvents, loading, eventLoading, loginClub, logoutClub, deleteClub, fetchClubEvents, fetchClub }}>
      {children}
    </ClubContext.Provider>
  );
};
export const useClubAuth = () => useContext(ClubContext);