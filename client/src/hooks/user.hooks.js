import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../constants";
import toast from "react-hot-toast";



export const useRegister = async (user) => {
    try {
        const response = await API.post("/quizapi/user/register", user);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}

export const useLogin = async (user) => {

    try {
        const response = await API.post('/quizapi/user/login', user);
        console.log(response);
        return response?.data;
    } catch (error) {
        if(error?.status === 401){
            toast.error(error?.response?.data?.message);
        }
    }
}

export const useLogout = async () => {
    const response = await API.post('/quizapi/user/logout');
    return response.data;
}



