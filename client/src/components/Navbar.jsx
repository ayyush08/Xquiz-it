import React from 'react'
import { buttonVariants } from "@/components/ui/button"


const Navbar = () => {
    return (
        <div className='bg-black flex items-center justify-between text-white h-16 w-full p-5'>
            <h1 className='text-4xl'>Xquisite</h1>
            <div>
                <ul className='flex space-x-10'>
                    <Link className={buttonVariants({ variant: "outline" })}>Login</Link>

                    <li>SignUp</li>

                </ul>
            </div>
        </div>
    )
}

export default Navbar