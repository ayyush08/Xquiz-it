import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;


export const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})
