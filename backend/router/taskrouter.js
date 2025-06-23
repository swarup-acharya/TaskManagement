const express=require ("express");
const router=express.Router();
const taskController=require("../Controller/taskController")
const jwtValidator=require("../middleware/jwtvalidation")


router.route("/addtask").post(jwtValidator,taskController.AddTask)
router.route("/updatetask/:id").put(jwtValidator,taskController.UpdateTask)
router.route("/gettask/:id").get(jwtValidator,taskController.GetTaskByID)
router.route("/deletetask/:id").delete(jwtValidator,taskController.DeleteTask)




module.exports=router