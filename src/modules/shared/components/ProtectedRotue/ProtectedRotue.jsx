import { Navigate } from "react-router-dom"

export default function ProtectedRotue({loginData, children}) {
    const token = localStorage.getItem('token')
  return (
    token || loginData ? children : <Navigate to={'/login'}/> 
  )
}
