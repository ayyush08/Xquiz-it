import axios from "axios";
import store from "./redux/store";
import toast from "react-hot-toast";
import { logout } from "./redux/authSlice";
const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})

const refreshAccessToken = async () => {
    console.log("refresh access token called");
    try {
        const { data } = await API.post("/quizapi/user/refresh-token");
        return data?.data;
    } catch (error) {
        throw error?.response?.data?.error;
    }
};


API.interceptors.response.use(
    (response) => {
        console.log("response", response);
        return response;
    },
    async (error) => {
        console.log("error occured", error.response.data);

        const originalRequest = error.config;
        if (
            error?.response?.data?.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                console.log("this refresh access token called");
                const { accessToken } = await refreshAccessToken();
                console.log("new access token", accessToken);
                API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                
                return Promise.reject(refreshError);
                
            }
        }
        if(error?.response?.data?.message === "Unauthorized request, token not found"){
            toast.error("Session expired, please login again");
            store.dispatch(logout());
        }
        console.log("error", error);
        
        return Promise.reject(error);
    }
);

export { API };


export const appName = "Xquiz-it";