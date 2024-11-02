import React, { useState } from 'react';
import { Button } from './ui/button';

const Question = () => {
    const sampleOptions = [
        {
            id: 1,
            text: 'Option 1',
            isCorrect: false,
            explanation: 'This is not the correct answer because...'
        },
        {
            id: 2,
            text: 'Option 2',
            isCorrect: false,
            explanation: 'This is not the correct answer because...'
        },
        {
            id: 3,
            text: 'Option 3',
            isCorrect: true,
            explanation: 'This is the correct answer because...'
        },
        {
            id: 4,
            text: 'Option 4',
            isCorrect: false,
            explanation: 'This is not the correct answer because...'
        }
    ]
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const checkOption = (option) => {
        if(selectedOption) return;
        console.log(option);
        setSelectedOption(option);
        if(option.isCorrect){
            setIsCorrect(true);
            console.log('Correct')
        }else{
            setIsCorrect(false);
            console.log('Wrong')}
    }
    return (

        <div className=' mx-auto p-10 h-[30rem] my-10 text-center '>
            <h1 className='  mx-auto font-mono text-4xl text-white font-bold mb-10 m-4'>Question 1</h1>
            {
                selectedOption && (
                    <div className={`mx-auto p-5  w-1/2 ${isCorrect ? 'text-green-500 ' : 'text-red-500 '}  rounded-md`}>
                        <p className='font-mono text-2xl  font-semibold'>{isCorrect ? 'Correct' : 'Wrong'}</p>
                        <p className='font-mono text-xl font-semibold'>{selectedOption.explanation}</p>
                    </div>)
            }
            {
                sampleOptions.map((option,index)=>(
                    <button onClick={()=>checkOption(option)} className={`flex transition-all  border-[1px] ${selectedOption && selectedOption.id == option.id
                        ? option.isCorrect
                            ? 'border-green-500 border-[3px] bg-teal-100' 
                            : 'border-red-500 border-[3px] bg-red-100'   
                        : 'border-gray-500 hover:cursor-pointer  text-white'  } ${!selectedOption && 'hover:bg-slate-100/15'}  italic w-1/3 mx-auto  font-mono p-5  h-[4rem] my-4 rounded-md`} key={index}>
                        <p className="text-xl mx-auto font-semibold">
                            {option.text}
                        </p>
                    </button>
                ))
            }
            <section className='space-x-5'>
                <Button variant='outline' className='mx-auto mt-10 bg-blue-700 text-white hover:bg-blue-800 hover:text-white border-none p-6 text-lg font-mono'>Attempt another</Button>
                <Button variant='outline' className='mx-auto mt-10 bg-teal-700 text-white hover:bg-teal-800 hover:text-white border-none p-6 text-lg font-mono'>Save Question</Button>
            </section>
        </div>
    );
};

export default Question;
