import { useState, useEffect } from "react"
import { createContext, ReactNode } from "react"
import { api } from "../services/api"

type AuthContext = {
    isLoading: boolean
    session: null | UserAPIResponse //tipagem global dentro da pasta dtos
    save: (data: UserAPIResponse) => void
    out: () => void
}

const LOCAL_STORAGE_KEY = "@refund"

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [session, setSession] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    function save(data: UserAPIResponse) {

        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)
        setSession(data)

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

    }

    function out() {
        setSession(null)

        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

        window.location.assign("/")
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

        if(token && user) {

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setSession({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ session, save, isLoading, out }}>
            {children}
        </AuthContext.Provider>
    )
}