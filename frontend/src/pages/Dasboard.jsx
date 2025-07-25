import React from 'react'
import Header from '../components/Dashboard/Header'
import Addtask from '../components/Dashboard/Addtask'
import { useState } from 'react'
import Title from '../components/Dashboard/Title'
import YetToStarwork from '../components/Dashboard/YetToStarwork'
import Inprogresswork from '../components/Dashboard/Inprogresswork'
import Completework from '../components/Dashboard/Completework'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './Login'
import EditTask from '../components/Dashboard/EditTask'
import Hero from '../components/Hero'

function Dasboard() {
  const [adddiv, setAdddiv] = useState("hidden")
  const [Tasks, setTasks] = useState([])
  const[EditTaskdiv,setEditTaskdiv]=useState("hidden")
  const[EditTaskId,setEditTaskId]=useState()



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responce = await axios.get("http://localhost:5400/api/v1/userdetails", {
          withCredentials: true
        })
        setTasks(responce.data.tasks)


      } catch (error) {
        console.log(error);

      }
    }
    fetchTasks()
    if(window.sessionStorage.getItem("editTaskId"))
    {
      setEditTaskdiv("block")
      setEditTaskId(window.sessionStorage.getItem("editTaskId"))
    }
  }, [adddiv])

  // console.log(Tasks);



  return (
    <div className='w-full relative  bg-orange-100'>
      <div className='bg-white'>
        <Header setAdddiv={setAdddiv}  />
      </div>
      <div>
        <Hero/>
      </div>

      <div className='px-12 py-4 my-2 flex gap-12 min-h[89vh] max-h-auto'>
        <div className='w-1/3 '>
          <Title title={"Task Yet To Start"} />
          <div className='pt-2 '>
            {/* {Tasks && <YetToStarwork  task={Tasks[0].yetToStart}/>}  */}
            {Tasks && <YetToStarwork task={Tasks[0]?.yetToStart} />}


          </div>
        </div>
        <div className='w-1/3 '>
          <Title title={"Task In Progress"} />
          <div className='pt-2 '>
            {Tasks && <Inprogresswork task={Tasks[1]?.inProgress}  />}
          </div>
        </div>
        <div className='w-1/3 '>
          <Title title={"Task In Completed"} />
          <div className='pt-2 '>
            {Tasks && <Completework task={Tasks[2]?.completed}  />}
          </div>
        </div>
      </div>

      <div className={`w-full ${adddiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>

      </div>
      <div className={`w-full ${adddiv} h-screen fixed top-0 left-0 flex items-center justify-center`} >
        <Addtask setAdddiv={setAdddiv} />
      </div>

       <div className={`w-full ${EditTaskdiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}>

      </div>
      <div className={`w-full ${EditTaskdiv} h-screen fixed top-0 left-0 flex items-center justify-center`} >
        <EditTask  EditTaskId={EditTaskId} setEditTaskdiv={setEditTaskdiv} />
      </div>

    </div>
  )
}

export default Dasboard