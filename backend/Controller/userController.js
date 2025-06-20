const User = require('../models/userSchema')
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExit = await User.findOne({ email: email })
        if (!isUserExit) {
            res.status(400).json({ message: "username or password is incorrect", success: false })
        } else {
            bcrypt.compare(password, isUserExit.password, (err, data) => {
                if (data) {

                    const token = JWT.sign({ id: isUserExit._id, email: isUserExit.email }, process.env.JWT_KEY, { expiresIn: "30d" })
                    res.cookie("taskToken", token, {
                        httpOnly: true,
                        secure: false,             // ⬅️ set to false for localhost
                        sameSite: "Lax",           // ⬅️ use 'Lax' instead of 'None' for localhost
                        maxAge: 30 * 24 * 60 * 60 * 1000
                    });
                    res.status(200).json({ message: "user Login successfuly", data: isUserExit, token: token, success: true })
                } else {
                    return res.status(400).json({ message: "Invilide credentials" })
                }
            })
        }

    } catch (error) {
        res.status(500).json({ message: "internal error", success: false })
    }

};



const Registration = async (req, res) => {
    try {
        if (req.body) {
            const isUserExit = await User.findOne({ username: req.body.username });

            if (isUserExit) {
                res.status(400).json({ message: "user already exists", success: false })
            } else {
                const { username, email, password } = req.body;
                const hashPassword = await bcrypt.hash(password, 10)
                const user = new User({ username, email, password: hashPassword })
                const isReg = await user.save()
                if (isReg) {
                    res.status(200).json({ message: "user register succesfully", data: user, success: true })
                }

            }
        }
    } catch (error) {
        res.status(500).json({ message: "user Registratin failed", data: error })

    }
};

const Logout = async (req, res) => {
    try {
        res.clearCookie("taskToken", {
            httpOnly: true,
        })
        res.status(200).json({ message: "user logout successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "internal error", success: false })
    }
}

const userDeatils = async (req,res)=>{
    try {
        const {user}=req
        const getDetails = await User.findById(user._id)
        .populate("tasks")
        .select("-password")
        if(getDetails){
            const allTasks=getDetails.tasks;
            let yetToStart =[];
            let inProgress=[];
            let completed=[];
            allTasks.map((item)=>{
                if(item.status === "Yet to start"){
                    yetToStart.push(item)
                }else if(item.status === "In Progress"){
                    inProgress.push(item)
                }else{
                    completed.push(item)
                }
            })
            res.status(200).json({success:"success",tasks:[{yetToStart},{inProgress},{completed}]})
        }
    } catch (error) {
        res.status(500).json({ message: "internal error", success: false })
    }
}

module.exports = { Registration, Login, Logout , userDeatils}