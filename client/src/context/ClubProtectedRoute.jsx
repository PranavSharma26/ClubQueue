import { Navigate } from "react-router-dom"
import { useClubAuth } from "./ClubContext"

const ClubProtectedRoute = ({children}) =>{
    
    const {club} = useClubAuth()
    if(!club) <Navigate to='/signin'/>
    return children
}

export default ClubProtectedRoute