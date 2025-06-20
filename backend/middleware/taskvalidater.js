const { validate } = require("../models/taskSchema")

const taskvallidation=(schema)=>{
return (req,res,next)=>{
 if(req.body){
    const{error}=schema.validate(req.body)
    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    next()

 }
}
}

module.exports=taskvallidation;