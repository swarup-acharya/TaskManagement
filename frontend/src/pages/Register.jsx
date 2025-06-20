import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function Register() {
   
    const navigate=useNavigate()
    const[value,setValue]=useState({
        username:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const responce=await axios.post("http://localhost:5400/api/v1/reg",value)
            alert(responce.data.message)
            console.log(responce);
            setValue({
                  username:"",
                  email:"",
                  password:""
            })
            navigate("/login")
            
        } catch (error) {
            
          alert(error.response.data.message)
            
        }
    }

  return (
    <>
     <Navbar/>
    <div className='flex h-screen  flex-col items-center justify-center'>
      <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
            <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>Task Manager</h1>
            <h3 className='text-center font-semibold text-xinc-900'>Register with TaskManager</h3>
        </div>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
           <form className='flex flex-col gap-4' >
                <input type="text" required placeholder='Enter your name'  className='border round px-4 py-1 border-zinc-400 w-[100%] outline-none'
                 name='username' value={value.username} onChange={handleChange} />
                <input type="email" required placeholder='Enter your emial'  className='border round px-4 py-1 border-zinc-400 w-[100%] outline-none'
                 name='email'  value={value.email} onChange={handleChange} />
                <input type="password" required placeholder='Enter your password'  className='border round px-4 py-1 border-zinc-400 w-[100%] outline-none'
                 name='password'  value={value.password} onChange={handleChange} />
                <button className='bg-blue-800 text-white- font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300' onClick={handleSubmit}>Register</button>
                <p className='text-center font-semibold text-gray-900'>
                    Already have an account? <Link to={"/login"} className='text-black-600 font-bold'>login</Link>
                </p>
            </form> 
        </div>   
    </div>
    </>
  )
}

export default Register