require ('dotenv').config()
const express=require("express")
const connDB=require('./config/db')
const router = require('./router/router')
const taskrouter = require('./router/taskrouter')
const cors=require("cors")
const app=express()
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
const cookieParser=require("cookie-parser")
app.use(express.json())
app.use(cookieParser())



app.use("/api/v1",router)
app.use("/api/v1",taskrouter)
const PORT=process.env.SERVER_PORT || 5400

connDB().then(()=>{
      app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}/ `);
        
    })
})
