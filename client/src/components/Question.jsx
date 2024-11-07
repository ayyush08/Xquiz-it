import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useGetQuestionFromAPI,useAddQuestion } from '../hooks/question.hooks';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
const Question = () => {
    const isUserLoggedIn = useSelector(state => state.auth.status);
    const [question, setQuestion] = useState({
        question: '',
        options: {},
        correctAnswers: {},
        userAnswers: {},
        explanation: '',
        multipleCorrectAnswers: false,
    });

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchQuestion = async () => {

        setIsLoaded(true);
        setSelectedOption(null);
        setIsCorrect('');
        const quiz = await useGetQuestionFromAPI();
        const { question, answers: options, correct_answers: correctAnswers, explanation, multiple_correct_answers: multipleCorrectAnswers } = quiz;

        setQuestion({
            question: question,
            options: options,
            correctAnswers: correctAnswers,
            userAnswers: [],
            explanation: explanation,
            multipleCorrectAnswers: multipleCorrectAnswers
        });
        setIsLoaded(false);
    }

    const handleSaveQuestion = async () => {
        if(!isUserLoggedIn){
            toast.error('Please login to save the question');
            return;
        }
        if(!selectedOption){
            toast.error('Please attempt the question first');
            return;
        }
        const addedQuestion = await useAddQuestion(question);
        if(addedQuestion){
            toast.success('Question added successfully');
            console.log('Question added successfully');
        }

        
    }

    useEffect(() => {

        fetchQuestion();
    }, [isUserLoggedIn]);

    if (isLoaded) {
        return (
            <div className=' flex justify-center items-center min-w-full min-h-[80vh]'>
                <Loader />
            </div>
        )
    }


    const checkOption = (optionKey) => {
        if (selectedOption) return;
        console.log(optionKey);
        setSelectedOption(optionKey);
        const correctAnswerkey = `${optionKey}_correct`;
        console.log(correctAnswerkey);
        console.log(question.correctAnswers[correctAnswerkey]);
        
        const isCorrect = question.correctAnswers[correctAnswerkey];
        setIsCorrect(isCorrect);
        setQuestion(
            {
                ...question,
                userAnswers: {
                    ...question.userAnswers,
                    [`${optionKey}_correct`]: isCorrect
                }
            }
        );
        

    }
    return (

        <div className=' mx-auto p-5 h-[30rem] my-10 text-center '>
            <Toaster />
            <h1 className='  mx-auto font-serif text-4xl text-white font-bold mb-10 m-2'>{question.question}</h1>
            {
                selectedOption && (
                    <div className={`mx-auto p-2  w-1/2 ${isCorrect==='true' ? 'text-green-500 ' : 'text-red-500 '}  rounded-md`}>
                        <p className='font-sans underline mb-2 text-3xl  font-semibold'>{isCorrect === 'true' ?'CORRECT' : 'WRONG'}</p>
                        <p className='font-mono text-xl font-semibold'>{question.explanation}</p>
                    </div>)
            }
            {
                question.options && Object.keys(question.options).map((key, index) => {
                    // console.log(key);
                    
                    const option = question.options[key];


                    return (
                        option ?
                            <button
                                key={index}
                                onClick={() => checkOption(key)} className={`flex transition-all  border-[1px] ${selectedOption && selectedOption == key
                                    ? (isCorrect === 'true')
                                        ? 'border-green-500 border-[3px] bg-teal-100'
                                        : 'border-red-500 border-[3px] bg-red-100'
                                    : 'border-gray-500 hover:cursor-pointer  text-white '} ${!selectedOption && 'hover:bg-slate-100/15'}  italic w-1/3 max-w-full mx-auto  font-mono p-5  max-h-full my-4 rounded-md`}>
                                <p className="text-xl text-wrap mx-auto font-semibold break-words text-center">
                                    {option}
                                </p>
                            </button> : null
                    )
                })
            }
            <section className='space-x-5'>
                <Button 
                onClick={()=>fetchQuestion()}
                variant='outline' className='mx-auto mt-10 bg-blue-700 text-white hover:bg-blue-800 hover:text-white border-none p-6 text-lg font-mono'>Attempt another</Button>
                <Button
                onClick={()=>handleSaveQuestion()}
                variant='outline' className='mx-auto mt-10 bg-teal-700 text-white hover:bg-teal-800 hover:text-white border-none p-6 text-lg font-mono'>Save Question</Button>
            </section>
        </div>
    );
};

export default Question;
