import axios from "axios";


export const getQuestionFromPublicAPI = async () => {
    const API_KEY = import.meta.env.VITE_QUIZ_API_KEY
    console.log(API_KEY);
    
    const question = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=1`);
    if(question){
        return question.data[0];
    }
    
}


const addQuestionToAPI = async (question) => {
    const response = await axios.post(`${API}/questions/add`, question);
    return response.data;
}

export const getUserQuestions = async () => {
    const response = await axios.get(`${API}/questions/get-questions`);
    return response.data;
}
