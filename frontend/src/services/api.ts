import axios from "axios"

const URL = "http://localhost:3333"

export const api = axios.create({
    baseURL: URL
})

api.interceptors.request.use((config) => {
    const session = JSON.parse(localStorage.getItem("session") || 'null')
    
    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }
    
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("session")
            window.location.href = "/"
        }
        return Promise.reject(error)
    }
)