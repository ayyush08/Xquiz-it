import axios from "axios";
import { API } from "../constants.js";


export const useGetQuestionFromAPI = async () => {
    const API_KEY = import.meta.env.VITE_QUIZ_API_KEY
    console.log(API_KEY);
    
    const question = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=1`);
    if(question){
        return question.data[0];
    }
    
}


const useAddQuestion = async (question) => {
    const response = await API.post('/quizapi/questions/add', question);
    return response.data;
}

export const useGetUserQuestions = async () => {
    const response = await API.get('/quizapi/questions/get-questions');
    return response.data;
}
