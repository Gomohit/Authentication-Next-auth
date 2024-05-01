import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(function middleware(req){
    console.log(req.nextUrl.pathname)
    console.log(req.nextauth.token.role)
    if(req.nextUrl.pathname.startsWith("/User") && req.nextauth.token.role!="admin"){
        console.log("ttttt",req.nextauth.token.role)
        return NextResponse.rewrite(new URL("/Denied",req.url))
    }
},
{
    callbacks:{
        authorized:({token})=>!!token
    }
}
)
export const config ={matcher:["/User","/Public"]}
