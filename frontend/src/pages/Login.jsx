import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'


function Login() {
 
      const navigate=useNavigate()
        const[value,setValue]=useState({
            email:"",
            password:""
        })
        const handleChange=(e)=>{
            setValue({...value,[e.target.name]:e.target.value})
        }
        const handleLogin=async(e)=>{
            e.preventDefault();
            try {
                const responce=await axios.post("http://localhost:5400/api/v1/login",
                    value,
                    {
                        withCredentials:true,
                    }
                )
                alert(responce.data.message)
                console.log(responce);
                localStorage.setItem("userLoggin","yes")
                navigate("/dashboard")
                setValue({
                      email:"",
                      password:""
                })
                
                
            } catch (error) {
                console.log(error);
                
              alert(error.response.data.message)
                
            }
        }
  return (
    <>
       <Navbar/>
      <div className='flex h-screen  flex-col items-center justify-center'>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
            <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>Task Manager</h1>
            <h3 className='text-center font-semibold text-xinc-900'>Login with TaskManager</h3>
        </div>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
           <form className='flex flex-col gap-4'>

                <input type="email" required placeholder='Enter your email'  className='border round px-4 py-1 border-zinc-400 w-[100%] outline-none'
                 name='email' value={value.email} onChange={handleChange} />
                <input type="password" required placeholder='Enter your password'  className='border round px-4 py-1 border-zinc-400 w-[100%] outline-none' 
                name='password' value={value.password} onChange={handleChange} />
                <button className='bg-blue-800 text-white- font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300' onClick={handleLogin}>Login</button>
                <p className='text-center font-semibold text-gray-900'>
                    Already have an account? <Link to={"/register"} className='text-black-600 font-bold'>Registration</Link>
                </p>
            </form> 
        </div>   
    </div>
    </>
  )
}

export default Login