// src/context/user.js
import { createContext, useContext, useState } from "react";
import { api } from "../api.js";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    const login = async (data) => {
        const response = await api.post("/api/v1/users/login", data)
        setUser(response.data.data.user)
        return response
    }

    const logout = async () => {
        await api.post("/api/v1/users/logout")
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}