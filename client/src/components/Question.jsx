import React, { useState, useEffect } from 'react';
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
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchQuestion = async () => {
        setIsLoaded(true);
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

    useEffect(() => {

        fetchQuestion();
    }, []);
    if (isLoaded) {
        return <h1>Loading...</h1>
    }


    const checkOption = (optionKey) => {
        if (selectedOption) return;
        console.log(optionKey);
        setSelectedOption(optionKey);
        const correctAnswerkey = `${optionKey}_correct`;
        console.log(correctAnswerkey);
        
        const isCorrect = question.correctAnswers[correctAnswerkey]==='true';
        setIsCorrect(isCorrect);
        setQuestion({ ...question, userAnswers: [...question.userAnswers, optionKey] });

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
                    // console.log(key);
                    
                    const option = question.options[key];


                    return (
                        option ?
                            <button
                                key={index}
                                onClick={() => checkOption(key)} className={`flex transition-all  border-[1px] ${selectedOption && selectedOption == key
                                    ? isCorrect
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
                <Button variant='outline' className='mx-auto mt-10 bg-blue-700 text-white hover:bg-blue-800 hover:text-white border-none p-6 text-lg font-mono'>Attempt another</Button>
                <Button variant='outline' className='mx-auto mt-10 bg-teal-700 text-white hover:bg-teal-800 hover:text-white border-none p-6 text-lg font-mono'>Save Question</Button>
            </section>
        </div>
    );
};

export default Question;
