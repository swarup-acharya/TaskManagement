import axios from 'axios';
import React from 'react'
import{IoLogOutOutline} from "react-icons/io5"
import { useNavigate } from 'react-router-dom';




function Header({setAdddiv}) {
    const navigate=useNavigate()
    const logout = async()=>{
        try {
            const res = await axios.post("http://localhost:5400/api/v1/logout",{},{
                withCredentials:true
            })
            alert(res.data.message)
            localStorage.clear("userLoggin")
            navigate("/login")
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='flex px-12 py-4 bg-blue-100 items-center justify-between shadow-md border-b'>
        <div>
            <h1 className='text-2xl text-blue-800 font-semibold'>
                 TaskManager
            </h1>
        </div>
            <div className='flex gap-8 '>
                <button className='hover:text-blue-800 transition-all duration-300' onClick={()=>setAdddiv("block")}>
                    Add Task
                    </button>
                <button className='hover:text-red-600 transition-all duration-300' onClick={logout}>
                    <IoLogOutOutline/>
                    </button>
            </div>
      
    </div>
  )
}

export default Header