import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
        if(res.data.role==="user") setUser(res.data.data);
				else setUser(null)
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => useContext(UserContext);