const mongoose=require("mongoose");
const URI=process.env.DATABASE_URL

const connDB=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("DB connect successfully");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connDB;