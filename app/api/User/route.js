import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"


export async function POST(req){
    try {
        const userData= await req.json()
        if(!userData?.email ||!userData?.password ){
            return NextResponse.json({
                message:"All field are required"
            },{status:400})
        }
        // check for duplicate email
        const dupEmail=await User.findOne({email:userData.email})
        .lean()
        .exec()
        if(dupEmail){
            return NextResponse.json({
                message:"Duplicate Email"
            },{status:400})
        }
        const hashedPassword=await bcrypt.hash(userData.password,10)
        userData.password=hashedPassword
        await User.create(userData)
        return NextResponse.json({
            message:"User Created successfully"
        },{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"err",
            err
        },{status:500})
    }
}