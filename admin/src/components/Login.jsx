import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function Login({setToken}) {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    
 
   const onSubmitHandler =async (e) => {
     try {
        e.preventDefault();
       const response = await axios.post(backendUrl + '/api/user/admin',{email, password});
       console.log(response)
       if(response.data.success){
        setToken(response.data.token)
       }else{
        toast.error(response.data.message)
       }
        
     } catch (error) {
        toast.error(response.data.message)
        console.log(error)
     }
   }

  return (
    <div className='flex items-center justify-center min-h-screen w-full ' >
         <div className='bg-white rounded-lg shadow-md max-w-md px-8 py-6'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

            <form onSubmit={onSubmitHandler} >
                <div className='min-w-72 mb-2'>
                    <p className='font-medium text-sm text-gay-700 mb-2 '>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)}  value={email} className='rounded-md w-full  px-3 py-2 border border-gray-300  outline-none'  type="email" placeholder='Enter Your Email ' required />
                </div>
                <div className='min-w-72 mb-2'>
                    <p className='font-medium text-sm text-gay-700 mb-2 ' >Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)}  value={password} className='rounded-md w-full  px-3 py-2 border border-gray-300  outline-none' type="password" placeholder='Enter Your Password ' required />
                </div>
                <button type='submit' className='w-full mt-2 bg-black text-white px-4 py-2 rounded-md'>Login</button>
            </form>

         </div>
      
    </div>
  )
}

export default Login
