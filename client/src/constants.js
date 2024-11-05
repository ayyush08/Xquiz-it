import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;


const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
})
API.interceptors.response.use(
    (response) => response, // For successful requests, just return the response
    async (error) => {
        console.log("error occured", error);
        const originalRequest = error.config;
        // Check if the error is due to an expired JWT and we haven't already retried the request
        if (
            error?.response?.data?.error === "jwt expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true; // Mark this request as retried
            try {
                console.log("this refresh access token called");
                const { accessToken } = await refreshAccessToken();
                console.log("new access token", accessToken);
                // Assume this function refreshes the token and returns the new one
                // Update the authorization header with the new token
                API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return API(originalRequest); // Retry the original request with the new token
            } catch (refreshError) {
                // If the token refresh fails, reject the promise
                return Promise.reject(refreshError);
            }
        }
        // For all other errors, just return the promise rejection
        return Promise.reject(error);
    }
);

export {API};