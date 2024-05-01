'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"
const UserForm = () => {
    const router=useRouter()
    const [formData,setFormData]=useState({})
    const [errorMessage,setErrorMessage]=useState("")
    const handleChange=(e)=>{
        const value=e.target.value
        const name=e.target.name
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setErrorMessage("")
        const res=await axios.post("/api/User",formData)
        console.log("userform res",res)
        if(!res.status=="OK"){
            console.log("gmm")
            const response=res
            setErrorMessage(response.message)
        }
        else{
            console.log("ghjkl")
            router.refresh()
            router.replace("/")
        }
    }
  return (
    <div className='max-w-screen-sm flex p-4 items-center border-4 mx-auto rounded-md'>
    <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-1/2 border-spacing-4 rounded-md w-full "
      >
        <h2 className='font-bold'>Create New User</h2>
        <label>Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 border-2 border-black rounded p-2"
        />
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 border-2 border-black rounded p-2 "
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 border-2 border-black rounded p-2 "
        />
        <input
          type="submit"
          value="Create User"
          className="bg-blue-300 hover:bg-blue-100 py-2 rounded-lg"
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  )
}

export default UserForm
