import axios from "axios";
import { API } from "src/constants";

export const registerUser = async (user) => {
    const response = await axios.post(`${API}/user/register`, user);
    return response.data;
}

export const loginUser = async (user) => {
    const response = await axios.post(`${API}/user/login`, user);
    return response.data;
}

export const logoutUser = async () => {
    const response = await axios.get(`${API}/user/logout`);
    return response.data;
}

