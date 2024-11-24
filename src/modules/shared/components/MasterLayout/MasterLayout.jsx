import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/Sidebar";
import { useEffect, useState } from "react";

export default function MasterLayout({loginData}) {
  const Navigate = useNavigate()
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
