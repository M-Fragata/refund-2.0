import axios from "axios"

const URL = "http://localhost:3333"

export const api = axios.create({
    baseURL: URL
})