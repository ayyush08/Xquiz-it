import React from 'react'

const Profile = () => {
    const sampleProfile = {
        name: 'John Doe',
        email: 'something@gmail.com',
        questions: [
            {
                question: 'What is the capital of India',
                answer: 'New Delhi',
                correctAnswer: 'New Delhi'
            },
            {
                question: 'What is the capital of USA',
                answer: 'Washington DC 2',
                correctAnswer: 'Washington DC'
                
            }
        ],
        correctAnswers: 1,
        incorrectAnswers: 3
    }
    return (
        <div className='p-10'>
        <h1 className='text-white text-4xl font-semibold text-center my-2'>{sampleProfile.name}</h1>
        <h3 className='text-slate-400 italic text-xl font-semibold text-center my-2'>{sampleProfile.email}</h3>
        <div className=' text-xl mt-20 font-semibold text-center my-2'>
            <p className=' text-green-500'>Correctly Answered Quiz Count: {sampleProfile.correctAnswers}</p>
            <p className='text-red-500'>Incorrectly Answered Quiz Count: {sampleProfile.incorrectAnswers}</p>
            </div>
        <h3 className='text-cyan-400 text-3xl my-8 font-mono font-semibold text-center'>Your recently attempted quizes:</h3>
        <div className='flex flex-col space-y-4'>
            {
                sampleProfile.questions.map((question,index)=>(
                    <div className='border-white  border-2 p-4 rounded-md shadow-md w-1/2 mx-auto'>
                        <h3 className='text-xl font-semibold text-white'>{question.question}</h3>
                        <p className={`text-lg font-mono ${question.answer===question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>Your Answer: {question.answer}</p>
                        <p className='text-lg text-green-500 font-mono'>Correct Answer: {question.correctAnswer}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Profile