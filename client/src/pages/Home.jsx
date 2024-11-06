import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import React from 'react'
import { appName } from '../constants'

const Home = () => {
    return (
        <div className='mx-auto font-sans text-center text-white p-5'>
            <h1 className=' text-8xl font-bold  mt-10 m-4'>
                Welcome to {appName} 
                </h1>
            <h3 className='text-5xl font-bold my-8'>
                Your one stop destination for quizzes
            </h3>
            <Button className='p-7 text-2xl  border-[3px] border-orange-300 bg-orange-600/50 hover:bg-orange-800 font-sans' asChild>
            <Link to='/quiz'>
            Start Quiz
            </Link>
            </Button>
        </div>
    )
}

export default Home