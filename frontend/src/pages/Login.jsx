import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reactHooks } from 'eslint-plugin-react-hooks';

function Login() {
  const [currentState, SetCurrentState] = useState('Login');
  const {token ,setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl+'/api/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      
      }else{
        const response = await axios.post(backendUrl+'/api/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
      }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }
  }
    useEffect(() => { 
      if(token){
        navigate('/');
      }
    }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center gap-4 text-gray-800 w-[90%] m-auto mt-14 sm:max-w-96' >
      <div className='inline-flex items-center gap-2 mt-10 mb-2'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='w-8 bg-gray-800 border-none h-[1.5px]' />
      </div>
     {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' className='border border-gray-800 w-full px-3 py-2' required  />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='border border-gray-800 w-full px-3 py-2' required  />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='border border-gray-800 w-full px-3 py-2' required  />
      <div className='w-full text-sm mt-[-8px] flex justify-between'>
        <p className='cursor-pointer'>Forgot Password</p>
        {
          currentState ==='Login'
          ? <p onClick={()=>SetCurrentState('Sign Up')} className='cursor-pointer '>Create Account</p>
          : <p onClick={()=>SetCurrentState('Login')} className='cursor-pointer '> Login Here </p>

        }
      </div>
      <button className='bg-black text-white font-light mt-4 px-8 py-2'>{currentState ==='Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
