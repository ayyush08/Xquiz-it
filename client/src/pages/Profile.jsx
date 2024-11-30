import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import Loader from '../components/Loader';
import { useGetUserQuestions } from '../hooks/question.hooks';
import { useNavigate } from 'react-router';
const Profile = () => {
    const user = useSelector(state => state.auth.userData.data.user);
    const isUserLoggedIn = useSelector(state => state.auth.status);
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
    useEffect(() => {
        const fetchUserQuestions = async () => {
            setIsLoadingQuestions(true);
            const userQuestions = await useGetUserQuestions();
            setQuestions(userQuestions);
            calculateCorrectAnswers(userQuestions);
            setIsLoadingQuestions(false);
        }
        fetchUserQuestions();
        
        
    }, [user])
    console.log(user);
    
    const calculateCorrectAnswers = (questions) => {
        let count = 0;
        console.log(questions);
        questions.map((quiz) => {
            const { userAnswers, correctAnswers } = quiz;
            Object.keys(userAnswers).forEach(key => {
                if (checkOptionFromKey(key, correctAnswers)) {
                    count++;
                }
            });
        });
        setCount(count);
    }

    if(isLoadingQuestions){
        return  <div className=' flex justify-center items-center min-w-full min-h-[80vh]'>
        <Loader />
    </div>
    }

    return (
        <div className='p-10'>
            <h1 className='text-white text-4xl font-semibold text-center my-2'>{user.name}</h1>
            <h3 className='text-slate-400 italic text-xl font-semibold text-center my-2'>{user.email}</h3>
            {questions.length === 0 ? (
                <h1 className='text-white text-4xl font-semibold text-center my-2'>No quizzes attempted yet</h1>
            ) : (
                <div>
                    <div className='text-xl mt-10 font-semibold text-center my-2'>
                        <p className='text-green-500'>Correctly Answered Quiz Count: {count}</p>
                        <p className='text-red-500'>Incorrectly Answered Quiz Count: {questions.length-count}</p>
                    </div>
                    <h3 className='text-cyan-400 text-3xl my-8 font-mono font-semibold text-center'>Your recently attempted quizzes:</h3>
                    <div className='flex flex-col space-y-4 '>
                        {questions.map((quiz, index) => {
                            
                            const { question, correctAnswers, userAnswers,options, explanation,createdAt } = quiz;
                            // console.log(userAnswers);
                            return (
                                <div key={index} className='border-white border-2 p-4 rounded-md border-r-[14px] border-b-[9px] border-r-orange-600 border-b-orange-600    w-1/2 mx-auto '>
                                    <h3 className='text-xl font-semibold text-white'>{question}</h3>
                                    <div className='text-lg font-mono text-cyan-300 flex gap-3 m-2'>{userAnswers.length > 1 ? 'Your Answers' : 'Your Answer'}:
                                    {
                                        Object.keys(userAnswers).map((key, idx) => {
                                            const isCorrect = checkOptionFromKey(key,correctAnswers);
                                            return <p key={idx} className={`text-lg font-mono ${isCorrect ? 'text-green-500': 'text-red-500'}`}>{
                                                getOptionFromKey(key,options) || null
                                            }</p>

                                        })
                                    }</div>
                                    <div className='text-lg font-mono text-cyan-300 flex gap-2 m-2'>{correctAnswers.length > 1 ? 'Correct Answers' : 'Correct Answer'}:
                                    {
                                        Object.keys(correctAnswers).map((key, idx) => (
                                            <p key={idx} className='text-lg font-mono text-green-500'>
                                                {
                                                    checkOptionFromKey(key,correctAnswers) ? getOptionFromKey(key,options,correctAnswers) : null
                                                }
                                            </p>
                                        ))
                                    }</div>
                                    <div className='text-lg font-mono text-cyan-300 flex gap-3 m-2'>Explanation:

                                    <p className='text-lg font-mono text-yellow-500'>{explanation}
                                    </p>

                                    </div>
                                    <p className=' flex text-sm float-end italic font-sans text-purple-400'>Attempted {moment(createdAt).fromNow()}</p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            )}
        </div>
    )
}





const getOptionFromKey = (key,options)=>{
    let option= null;
    const optionKey = key.split('_correct')[0];
    
    return options[optionKey];
}

const checkOptionFromKey = (key,correctAnswers)=>{
    
    return correctAnswers[key];
}
export default Profile