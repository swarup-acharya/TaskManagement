const Joi =require("joi")
const RegSchema=Joi.object({
    username:Joi.string().max(20).min(3),
    email:Joi.string().email() .required(),
    password:Joi.string().min(6).max(100).required(),
})

module.exports=RegSchema;