import { useContext } from "react"
import { AuthContext } from "../../../../context/AuthContext"
import { Navigate } from "react-router-dom"
import NotFound from "../NotFound/NotFound"

export default function ProtectedRouteIsUser({children}) {
  const {loginData} = useContext(AuthContext)
  return (
    loginData?.userGroup === 'SystemUser' ? children : <Navigate to={<NotFound/>}/>
  )
}