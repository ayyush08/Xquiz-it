import React from 'react'
import { Button } from "./ui/button"
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div className='flex items-center justify-between h-16 w-full p-10 border-b-2 border-opacity-15 border-white'>
            <h1 className='text-4xl font-mono italic font-semibold text-white'>Xquizite</h1>
            <div>
                <ul className='flex space-x-2'>
                    <Button variant="outline" asChild>
                        <Link to='/login'>Login</Link>
                    </Button>
                    <Button variant="" asChild>
                        <Link to='/signup'>SignUp</Link>
                    </Button>

                </ul>
            </div>
        </div>
    )
}

export default Navbar