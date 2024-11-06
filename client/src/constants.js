import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;


const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})

const refreshAccessToken = async () => {
    console.log("refresh access token called");
    try {
        const { data } = await API.post("/quizapi/user/refresh-token");
        console.log(data);
        return data?.data;
    } catch (error) {
        throw error?.response?.data?.error;
    }
};


API.interceptors.response.use(
    (response) => response,
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
        return Promise.reject(error);
    }
);

export { API };


export const appName = "Xquiz-it";