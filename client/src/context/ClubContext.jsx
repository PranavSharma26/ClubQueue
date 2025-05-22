import { createContext, useContext, useState } from "react";

const ClubContext = createContext()

export const ClubProvider = ({children}) => {
    const [club, setClub] = useState(()=>{
        const storedClub = localStorage.getItem('club')
        return storedClub ? JSON.parse(storedClub) : null 
    })
    const loginClub=(clubData)=>{
        localStorage.setItem('club',JSON.stringify(clubData))
        setClub(clubData)
    }
    const logoutClub=()=>{
        localStorage.removeItem('club')
        setClub(null)
    }
    return(
        <ClubContext.Provider value={{club,loginClub, logoutClub}}>
            {children}
        </ClubContext.Provider>
    )
}

export const useClubAuth = () => useContext(ClubContext)