import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../../context/AuthContext"

export default function ProtectedRotue({children}) {
  const {loginData} = useContext(AuthContext)
  const token = localStorage.getItem('token')
  return (
    token || loginData ? children : <Navigate to={'/login'}/> 
  )
}
