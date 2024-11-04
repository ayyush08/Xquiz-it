import axios from "axios";
import { API } from "../constants";

export const useRegister = async (user) => {
    const response = await API.post("/quizapi/user/register", user);
    return response.data;
}

export const useLogin = async (user) => {
    const response = await API.post('/quizapi/user/login', user);
    return response.data;
}

export const useLogout = async () => {
    const response = await API.post('/quizapi/user/logout');
    console.log(response);
    
    return response.data;
}

