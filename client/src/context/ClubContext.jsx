import { createContext, useContext, useEffect, useState } from "react";
const ClubContext = createContext();
export const ClubProvider = ({ children }) => {
  const [club, setClub] = useState();
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
        if (res.data.role==="club") setClub(res.data.data);
        elsesetClub(null);
      } catch (err) {
        setClub(null);
      }
    };
    fetchClub();
  }, []);
  return (
    <ClubContext.Provider value={{ club, loginClub, logoutClub }}>
      {children}
    </ClubContext.Provider>
  );
};
export const useClubAuth = () => useContext(ClubContext);