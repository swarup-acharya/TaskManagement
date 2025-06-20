const express=require ("express");
const router=express.Router();
const userController=require("../Controller/userController")
const userValidation=require("../validation/uservalidation")
const validate=require("../middleware/validater")
const jwtValidator=require("../middleware/jwtvalidation")


router.route("/reg").post(validate(userValidation),userController.Registration)
router.route("/login").post(validate(userValidation),userController.Login)
router.route("/logout").post(userController.Logout)
router.route("/userdetails").get(jwtValidator,userController.userDeatils)


module.exports=router;