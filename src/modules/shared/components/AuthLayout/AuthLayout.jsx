import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const Navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) return true
    else return false
  })

  useEffect(() => {
    if (isAuth) {
      Navigate('/dashboard')
    }
  }, [])
  return (
    <>
      { !isAuth && <div className="auth-container">
        <div className="container-fluid bg-overlay px-5">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <Outlet/>
          </div>
        </div>
      </div>}
    </>
  )
}
