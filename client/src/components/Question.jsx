import React, { useState,useEffect } from 'react';
import { Button } from './ui/button';
import { useGetQuestionFromAPI } from '../hooks/question.hooks';

const Question = () => {
    const [question, setQuestion] = useState({
        question: '',
        options: [],
        correctAnswers: [],
        userAnswers: [],
        explanation: '',
        multipleCorrectAnswers: false,
    });
    // console.log(question.options);
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);



    useEffect(() => {
        const fetchQuestion = async () => {
            const quiz = await useGetQuestionFromAPI();
            const { question, answers: options, correct_answers:correctAnswers, explanation, multiple_correct_answers:multipleCorrectAnswers } = quiz;
            
            setQuestion({
                question: question,
                options: options,
                correctAnswers: correctAnswers,
                userAnswers: [],
                explanation: explanation,
                multipleCorrectAnswers: multipleCorrectAnswers
            });
        }
        fetchQuestion();
    }, [])
 
    const checkOption = (option) => {
        if(selectedOption) return;
        console.log(option);
        
        setQuestion({...question, userAnswers: [...question.userAnswers, option.text]});
        setSelectedOption(option);
        const { correctAnswers } = question;
        const isCorrect = Object.keys(correctAnswers).includes(option);
        setIsCorrect(isCorrect);
        
    }
    return (

        <div className=' mx-auto p-10 h-[30rem] my-10 text-center '>
            <h1 className='  mx-auto font-mono text-4xl text-white font-bold mb-10 m-4'>{question.question}</h1>
            {
                selectedOption && (
                    <div className={`mx-auto p-5  w-1/2 ${isCorrect ? 'text-green-500 ' : 'text-red-500 '}  rounded-md`}>
                        <p className='font-mono text-2xl  font-semibold'>{isCorrect ? 'Correct' : 'Wrong'}</p>
                        <p className='font-mono text-xl font-semibold'>{question.explanation}</p>
                    </div>)
            }
            {
                question.options && Object.keys(question.options).map((key, index) => {
                    const option = question.options[key];
                    return (
                        option ?
                        <button onClick={() => checkOption(option)} className={`flex transition-all  border-[1px] ${selectedOption && selectedOption.id == option.id
                            ? option.isCorrect
                                ? 'border-green-500 border-[3px] bg-teal-100'
                                : 'border-red-500 border-[3px] bg-red-100'
                            : 'border-gray-500 hover:cursor-pointer  text-white text-wrap'} ${!selectedOption && 'hover:bg-slate-100/15'}  italic w-1/3 mx-auto  font-mono p-5  h-[4rem] my-4 rounded-md`} key={index}>
                            <p className="text-xl mx-auto font-semibold">
                                {option}
                            </p>
                        </button> : null
                    )
                })
            }
            <section className='space-x-5'>
                <Button variant='outline' className='mx-auto mt-10 bg-blue-700 text-white hover:bg-blue-800 hover:text-white border-none p-6 text-lg font-mono'>Attempt another</Button>
                <Button variant='outline' className='mx-auto mt-10 bg-teal-700 text-white hover:bg-teal-800 hover:text-white border-none p-6 text-lg font-mono'>Save Question</Button>
            </section>
        </div>
    );
};

export default Question;
