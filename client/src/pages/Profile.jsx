import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserQuestions } from '../hooks/question.hooks';
const Profile = () => {
    const user = useSelector(state => state.auth.userData.data.user);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchUserQuestions = async () => {
            const userQuestions = await useGetUserQuestions();
            setQuestions(userQuestions);
        }
        fetchUserQuestions();
        
        
    }, [])
    console.log(questions);
    const { correct, incorrect } = calculateCorrectAnswers(questions);
    const sampleQuestions = [
        {
            question: 'What is the capital of India?',
            correctAnswer: 'New Delhi',
            answer: 'New Delhi'
        },
        {
            question: 'What is the capital of USA?',
            correctAnswer: 'Washington DC',
            answer: 'Washington DC'
        },
        {
            question: 'What is the capital of UK?',
            correctAnswer: 'London',
            answer: 'London'
        }
    ]


    return (
        <div className='p-10'>
            <h1 className='text-white text-4xl font-semibold text-center my-2'>{user.name}</h1>
            <h3 className='text-slate-400 italic text-xl font-semibold text-center my-2'>{user.email}</h3>
            {questions.length === 0 ? (
                <h1 className='text-white text-4xl font-semibold text-center my-2'>No quizzes attempted yet</h1>
            ) : (
                <div>
                    <div className='text-xl mt-20 font-semibold text-center my-2'>
                        <p className='text-green-500'>Correctly Answered Quiz Count: {correct}</p>
                        <p className='text-red-500'>Incorrectly Answered Quiz Count: {incorrect}</p>
                    </div>
                    <h3 className='text-cyan-400 text-3xl my-8 font-mono font-semibold text-center'>Your recently attempted quizzes:</h3>
                    <div className='flex flex-col space-y-4'>
                        {questions.map((quiz, index) => {
                            const { question, correctAnswers, userAnswers, explanation } = quiz;
                            return (
                                <div key={index} className='border-white border-2 p-4 rounded-md shadow-md w-1/2 mx-auto'>
                                    <h3 className='text-xl font-semibold text-white'>{question}</h3>
                                    <p className='text-lg font-mono text-cyan-300'>Your answers:</p>
                                    {userAnswers.map((answer, idx) => (
                                        <p key={idx} className={`text-lg font-mono ${correctAnswers.includes(answer) ? 'text-green-500' : 'text-red-500'}`}>
                                            {answer}
                                        </p>
                                    ))}
                                    <p className='text-lg font-mono text-cyan-300'>{correctAnswers.length > 1 ? 'Correct Answers' : 'Correct Answer'}:</p>
                                    {correctAnswers.map((correctAnswer, idx) => (
                                        <p key={idx} className='text-lg text-green-500 font-mono'>{correctAnswer}</p>
                                    ))}
                                    <p className='text-lg font-mono text-cyan-300'>Explanation:</p>
                                    <p className='text-lg font-mono text-yellow-500'>{explanation}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}


const calculateCorrectAnswers = (questions) => {
    let count = 0;
    for(let i=0; i<questions.length; i++){
        const { correctAnswers, userAnswers } = questions[i];
        for(let j=0; j<correctAnswers.length; j++){
            if(userAnswers.includes(correctAnswers[j])){
                count++;
            }
        }
    }
    return { correct: count, incorrect: questions.length - count };
}

export default Profile