import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export default function AuthContextProvider({children}) {
    const [loginData, setLoginData] = useState(null)
    const saveLoginData = () => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        setLoginData(decoded);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
        saveLoginData()
        }
    }, [])

    return (
        <AuthContext.Provider value={{loginData, saveLoginData}}>
            {children}
        </AuthContext.Provider>
    )
}