const task=require('../models/taskSchema')

const AddTask= async(req,res)=>{
        try {
            const{title,description,priority,status}=req.body
            const {user}=req
            if(!title || !description){
                return res.status(400).json({message:"All fields are required",success:false})
            }
            if(title.length<3 ){
                return res.status(400).json({message:"Title have must 6 character",success:false})
            }
            if(description.length<5 ){
                return res.status(400).json({message:"Description have must 6 character",success:false})
            }
            const newtasak=new task({title,description,priority,status});
            await newtasak.save()
            user.tasks.push(newtasak._id)
            await user.save()
                return res.status(200).json({message:"Task added", sucess:true})
            
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message:"internal error",success:false})
            
        }
}

const UpdateTask= async(req,res)=>{
        try {
            const{id}=req.params
            const{title,description,priority,status}=req.body
            if(!title || !description){
                return res.status(400).json({message:"All fields are required",success:false})
            }
            if(title.length<5 ){
                return res.status(400).json({message:"Title have must 6 character",success:false})
            }
            if(description.length<5 ){
                return res.status(400).json({message:"Description have must 6 character",success:false})
            }
            await task.findByIdAndUpdate(id,{title,description,priority,status},{new:true})
             return res.status(200).json({message:"Task are Updated", sucess:true})
            
        } catch (error) {
            res.status(500).json({message:"internal error",success:false})
            
        }
}

const GetTask= async(req,res)=>{
        try {
           const taskdata=await task.find({})
           if(taskdata){
               return res.status(200).json({message:"Task Updated", data:taskdata ,sucess:true})
           }
            
        } catch (error) {
            res.status(500).json({message:"internal error",success:false})
            
        }
}


const GetTaskByID = async (req, res) => {
  try {
    const { id } = req.params;
    const taskdata = await task.findById(id);

    if (taskdata) {
      return res.status(200).json({
        message: "Task Found",
        data: taskdata,
        success: true
      });
    } else {
      return res.status(404).json({
        message: "Task Not Found",
        success: false
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message
    });
  }
};

const DeleteTask= async(req,res)=>{
        try {
            const{id}=req.params
           const taskdata=await task.findByIdAndDelete(id)
           if(taskdata){
               return res.status(200).json({message:"Task Deleted", sucess:true})
           }
            
        } catch (error) {
            res.status(500).json({message:"internal error",success:false})
            
        }

    }


    module.exports={AddTask,UpdateTask,GetTask,GetTaskByID,DeleteTask}