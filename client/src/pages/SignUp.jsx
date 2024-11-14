import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../redux/authSlice';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister,useLogin } from '../hooks/user.hooks';
import toast from 'react-hot-toast';
import { appName } from '../constants';
const SignUp = () => {
  const {
    register,
    isSubmitting,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onSubmit = async (data) => {
    setIsLoggingIn(true);
    console.log(data)
    const registeredUser = await useRegister(data);
    if(registeredUser){
      const loginUser = await useLogin({
        email: data.email,
        password: data.password
      });
      console.log(loginUser.data.user);
      if(loginUser){
        dispatch(login(loginUser));
        setIsLoggingIn(false);
        toast.success('Account created successfully');
        navigate('/profile');
      }

    }
  }
  return (
    <>
    <div className='p-8'>
        <h1 className='text-4xl text-center font-sans italic text-white font-bold mb-10 m-4'>Create an {appName} Account</h1>
        <form className='w-1/3 mx-auto space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
            <label className="block text-white text-xl font-mono">Name: </label>
            <input
              placeholder='Enter your name'
              type="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.name && <div className="text-red-500">Name is required</div>}
          </div>
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
              {isLoggingIn ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className='text-white text-center mt-16 text-2xl mx-auto'>
          Already have an account?
          <Link to='/login' className='mx-3 text-teal-300 font-mono text-2xl hover:underline'>
            Login
          </Link>
              to continue
        </div>
      </div>
    </>
  )
}

export default SignUp