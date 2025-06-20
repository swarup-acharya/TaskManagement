const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
   title:{
         type:String,
         required:true
   },
    priority:{
         type:String,
         required:true,
         enum:["low","medium","high"],
         default:"low",
   },
    status:{
         type:String,
         required:true,
         enum:["Yet to start","In Progress","completed"],
         default:"Yet to start",
   },
   description:{
         type:String,
         required:true
   }
  
  
},
{
    timestamps:true
});

module.exports=mongoose.model("Task",taskSchema)
