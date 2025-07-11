import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function Addtask({setAdddiv}) {
    const[value,setValue]=useState({
        title:"",
        description:"",
        priority:"low",
        status:"Yet to start"
    })

    const handleChange=(e)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }

    const handleAdd= async(e)=>{
        e.preventDefault()
        try {
            const responce= await axios.post("http://localhost:5400/api/v1/addtask",value,{
                withCredentials:true
            })
            console.log(responce.data.message);
            alert(responce.data.message)
            setAdddiv("hidden")
            setValue({
                title:"",
                description:"",
                priority:"low",
                status:"Yet to start"
            })
            
        } catch (error) {
            console.log(error.responce.data.message);
            alert(error.responce.data.message)
            
        }
    }
  return (
    <div className='bg-white px-4 py-4 w-[40%]'>
        <h1 className='text-center font-semibold tetx-xl'>Add Task</h1>
        <hr className='mb-4 mt-12' />
        <form className='flex flex-col gap-4'>
            <input type="text"  className='border px-2 py-1 rounded border-zinc-300 outline-none' placeholder='Enter tiitle'
            name='title' value={value.title} onChange={handleChange}/>
            <div className='flex gap-4 items-center justify-center'>
                <div className='w-full'>
                    <h3 className='mb-2'>Select Priority</h3>
                    <select name="priority" id="" className='border px-2 py-1 round border-zinc-800 outline-none w-full'  onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className='w-full'>
                    <h3 className='mb-2'>Select status</h3>
                    <select name="status" id="" className='border px-2 py-1 round border-zinc-800 outline-none w-full'  onChange={handleChange}>
                        <option value="Yet to start">Yet to Start</option>
                        <option value="In Progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>             
            </div>
                  <textarea name="description" id="" placeholder='Enter task description'
                className='border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]' value={value.description}  onChange={handleChange} >
                    
                </textarea>

                <div  className='flex gap-4 items-center justify-center'>
                    <button className='w-full bg-blue-600 py-2 hover:bg-blue-500 transition-all duration-300 text-white rounded' onClick={handleAdd}>Add Task</button>
                    <button className='w-full border border-black  py-2 hover:bg-zinc-300 transition-all duration-300 text-black rounded'
                    onClick={()=>setAdddiv("hidden")}>Cancel</button>
                </div>
        </form>
    </div>
  )
}

export default Addtask