import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(()=>{
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    const loginUser = (userData) => {
        localStorage.setItem('user',JSON.stringify(userData))
        setUser(userData)
    }
    const logoutUser = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return(
        <UserContext.Provider value={{user,loginUser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )

}

export const useAuth = () => useContext(UserContext)
