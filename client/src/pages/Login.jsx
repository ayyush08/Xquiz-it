import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/user.hooks';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import toast from 'react-hot-toast';
import { appName } from '../constants';
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    isSubmitting,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onSubmit = async (data) => {
    const loggedInUser = await useLogin(data);
    
    if(loggedInUser){
      console.log(loggedInUser);
      dispatch(login(loggedInUser));
      toast.success('Logged in successfully');
      navigate('/profile');
    }
  }
  return (
    <>
      <div className='p-8'>
        <h1 className='text-4xl text-center font-sans italic text-white font-bold mb-10 m-4'>Login to your {appName} Account</h1>
        <form className='w-1/3 mx-auto space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
            <label className="block text-white text-xl font-mono">Email: </label>
            <input
              placeholder='Enter your email'
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.email && <div className="text-red-500">Email is required</div>}
          </div>
          <div className="relative">
            <label className="block text-white font-mono text-xl">Password:</label>
            <input
              placeholder='Enter your password'
              type={passwordVisible ? 'text' : 'password'}
              {...register("password", {
                required: { value: true, message: 'Password is required' },
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                maxLength: { value: 20, message: 'Password cannot exceed 20 characters' }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 "
            />
            {errors.password && <div className="text-red-500">{errors.password.message}</div>}
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-[40px] right-0 pr-3 flex items-center cursor-pointer"
            >
              {passwordVisible ? <FaEyeSlash style={{ color: 'black' }} /> : <FaEye style={{ color: 'black' }} />}
            </span>
          </div>
          <div className='flex items-center justify-center'>

            <button
              type="submit"
              className=" mx-auto text-white bg-orange-700 text-xl px-4 font-mono py-3 rounded-lg hover:bg-orange-800 "
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className='text-white text-center mt-16 text-2xl mx-auto'>
          New User?
          <Link to='/signup' className='mx-3 text-teal-300 font-mono text-2xl hover:underline'>
            SignUp
          </Link>
              to continue
        </div>
      </div>
    </>
  )
}

export default Login