import { Navigate } from "react-router-dom"
import { useAuth } from "./UserContext"
import { useClubAuth } from "./ClubContext"

const PublicOnlyRoute=({children})=>{
    const {user,loading:userLoading} = useAuth()
    const {club,loading:clubLoading} = useClubAuth()
    if(userLoading || clubLoading) return <div>Loading...</div>

    if(user || club) return <Navigate to="/"/>
    return children
}
export default PublicOnlyRoute;