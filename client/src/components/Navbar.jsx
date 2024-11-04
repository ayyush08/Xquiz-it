import React from 'react'
import { Button } from "./ui/button"
import { Link,useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { persistor } from '../redux/store'
import { logout } from '../redux/authSlice'
import { useLogout } from '../hooks/user.hooks'
const Navbar = () => {
    const isUserLoggedIn = useSelector(state => state.auth.status);
    const dispatch = useDispatch();
    console.log(isUserLoggedIn);

    const handleLogout = async() => {    
        useLogout().then((data) => {
            console.log(data);
            if (data) {
                console.log('Logged out');
                
            }
        });
        dispatch(logout());
        persistor.purge();
        navigate('/')
    }
    const location = useLocation();
    return (
        <div className='flex items-center justify-between h-16 w-full p-10 border-b-2 border-opacity-15 border-white'>
            <Link to='/' className='text-4xl font-mono italic font-semibold text-white'>Xquizite</Link>
            <div>
                <ul className='flex space-x-2'>
                    {!isUserLoggedIn && location.pathname!=='/login' ? <Button variant="outline" asChild>
                        <Link to='/login'>Login</Link>
                    </Button>:null}
                    {!isUserLoggedIn && location.pathname!=='/signup' ?  <Button variant="" asChild>
                        <Link to='/signup'>SignUp</Link>
                    </Button>:null}
                    {
                        isUserLoggedIn && location.pathname!='/profile' ? <Button variant="outline" asChild>
                            <Link to='/profile'>Profile</Link>
                        </Button> : null
                    }
                    {
                        isUserLoggedIn ? <Button onClick={handleLogout} variant="" asChild>
                            <Link to='/'>Logout</Link>
                        </Button>: null
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar