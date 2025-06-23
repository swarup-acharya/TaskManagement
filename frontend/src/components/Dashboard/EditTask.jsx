import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function EditTask({ setEditTaskdiv, EditTaskId }) {
    const [value, setValue] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "Yet to start"
    })
    // console.log(EditTaskId);
    

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:5400/api/v1/gettask/${EditTaskId}`, {
                    withCredentials: true
                })
                setValue(res.data.data)
                // console.log(res.data.data);
                // console.log(res);
                
                
            } catch (error) {

            }
        }
        fetch()
    }, [EditTaskId])

    const handleEdit = async (e,id) => {
        e.preventDefault()
        try {
            const responce = await axios.put(`http://localhost:5400/api/v1/updatetask/${id}`, value, {
                withCredentials: true
            })
            // console.log(responce);
            alert(responce.data.message)
            window.sessionStorage.clear("editTaskId")
            window.location.reload();
            setEditTaskdiv("hidden")
        } catch (error) {
            console.log(error);
            alert(error.responce.data.message)

        }
    }

    const handleDelete = async (e,id) => {
        e.preventDefault()
       try {
         const res = await axios.delete(`http://localhost:5400/api/v1/deletetask/${id}`,{
            withCredentials:true
         })
        //  console.log(res);
         
      alert(res.data.message)
            window.sessionStorage.clear("editTaskId")
            window.location.reload();
            setEditTaskdiv("hidden")
        } catch (error) {
            // console.log(error);
            alert(error.res.data.message)

        }
    }
    // console.log(EditTaskId);
    
    return (
        <div className='bg-white px-4 py-4 w-[40%]'>
            <h1 className='text-center font-semibold tetx-xl'>Edit Task</h1>
            <hr className='mb-4 mt-12' />
            <form className='flex flex-col gap-4'>
                <input type="text" className='border px-2 py-1 rounded border-zinc-300 outline-none' placeholder='Enter tiitle'
                    name='title' value={value.title || ""} onChange={handleChange} />
                <div className='flex gap-4 items-center justify-center'>
                    <div className='w-full'>
                        <h3 className='mb-2'>Select Priority</h3>
                        <select name="priority" id="" className='border px-2 py-1 round border-zinc-800 outline-none w-full' onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <h3 className='mb-2'>Select status</h3>
                        <select name="status" id="" className='border px-2 py-1 round border-zinc-800 outline-none w-full' onChange={handleChange}>
                            <option value="Yet to start">Yet to Start</option>
                            <option value="In Progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <textarea name="description" id="" placeholder='Enter task description'
                    className='border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]' value={value.description || ""} onChange={handleChange} >

                </textarea>

                <div className='flex gap-4 items-center justify-center'>
                    <button className='w-full bg-blue-600 py-2 hover:bg-blue-500 transition-all duration-300 text-white rounded' onClick={(e)=>handleEdit(e,value._id)}>Edit Task</button>
                    <button className='w-full border border-red-600  py-2 hover:bg-zinc-300 transition-all duration-300 text-red-600 rounded'
                       onClick={(e)=>handleDelete(e,value._id)}>Delete</button>
                    <button className='w-full border border-black  py-2 hover:bg-zinc-300 transition-all duration-300 text-black rounded'
                        onClick={(e) => {
                            e.preventDefault()
                            window.sessionStorage.clear("editTaskId")
                            setEditTaskdiv("hidden")
                        }}>Cancel</button>

                </div>
            </form>
        </div>
    )
}

export default EditTask