const Joi =require("joi")
const TaskSchema=Joi.object({
    title:Joi.string().max(100).min(5),
    description:Joi.string().max(500).min(6),
    priority:Joi.string().valid("low","medium","high").default("low"),
    status:Joi.string().valid("yetToStart","inProgress","completed").default("yetToStart"),
})

module.exports=TaskSchema;