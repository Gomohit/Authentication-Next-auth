import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from 'bcrypt';

const GOOGLE_CLIENT_ID=process.env.GOOGLE_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_SECRET
console.log("first",GOOGLE_CLIENT_ID)
export const options={
    
    providers:[
        GitHubProvider({
            profile(profile){
                console.log("fjklgh",process.env.GITHUB_ID)
                console.log("profile github",profile)
                let userRole="Github user"
                console.log(process.env.GITHUB_ID)
                if(profile?.email=="goyalmohit2002@gmail.com"){
                    userRole="admin"
                }
                return {
                    ...profile,
                    role:userRole
                }
            },
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET,          
        }),
        GoogleProvider({
            profile(profile){
                console.log("profile google",profile)
                let userRole="Google user"
                return {
                    ...profile,
                    id:profile.sub,
                    role:userRole
                }
            }, 
            clientId:GOOGLE_CLIENT_ID,
            clientSecret:GOOGLE_CLIENT_SECRET,       
        }),
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{
                    label: "email:",
                    type: "text", 
                    placeholder: "email" 
                },
                password:{
                    label: "password:",
                    type: "text", 
                    placeholder: "password" 
                },
            },
            async authorize(credentials){
                try{
                    const foundUser=await User.findOne({email:credentials.email})
                    .lean()
                    .exec()
                    if(foundUser){
                        console.log("user Exist")
                        const matchPass=await bcrypt.compare(
                            credentials.password,
                            foundUser.password
                          );
                        if(matchPass){
                            console.log("password is correct")
                            delete foundUser.password
                            foundUser["role"]="unverified email"
                            return foundUser
                        }
                    }
                }
                catch(error){
                    console.log("error in authorize",error)
                }
                return null
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.role=user.role
            }
            return token
        },
        async session({session,token}){
            if(session?.user)session.user.role=token.role
            return session
        }
    },
    // secret: process.env.NEXTAUTH_SECRET,
}