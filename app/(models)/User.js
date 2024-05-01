import mongoose,{Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)


const userScehma=new Schema({
    name:String,
    email:String,
    password:String
},{
    timestamps:true
})

const User=mongoose.models.User|| mongoose.model("User",userScehma)

export default User;