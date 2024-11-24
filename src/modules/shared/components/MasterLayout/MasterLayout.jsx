import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function MasterLayout() {
  const Navigate = useNavigate()
  const {loginData} = useContext(AuthContext)
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) return true
    else return false
  })

  useEffect(() => {
    if (!isAuth) {
      Navigate('/')
    }
  }, [])

  return (
    <>
      { isAuth && <div>
              <div className="d-flex">
                <div className="">
                  <SideBar/>
                </div>
                <div className="w-100 px-3 py-3">
                  <Navbar loginData={loginData}/>
                  <Outlet/>
                </div>
              </div>
            </div>}
    </>
  )
}
