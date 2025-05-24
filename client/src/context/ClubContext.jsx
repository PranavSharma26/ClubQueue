import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ClubContext = createContext();
export const ClubProvider = ({ children }) => {
  const [club, setClub] = useState();
  const [loading, setLoading] = useState(true);
  const loginClub = (clubData) => {
    setClub(clubData);
  };
  const logoutClub = () => {
    setClub(null);
  };
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        if (res.data.role === "club") setClub(res.data.data);
        else setClub(null);
      } catch (err) {
        setClub(null);
      } finally {
        setLoading(false);
      }
    };
    fetchClub();
  }, []);
  return (
    <ClubContext.Provider value={{ club, loading, loginClub, logoutClub }}>
      {children}
    </ClubContext.Provider>
  );
};
export const useClubAuth = () => useContext(ClubContext);