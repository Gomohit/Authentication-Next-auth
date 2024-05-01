'use client'

import React from 'react'
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation'
const Member = () => {
  const {data:session}=useSession({
    required:true,
    onUnauthenticated(){
      redirect("api/auth/signin?callback=/ClientMember")
    }
  })
  return (
    <div>
      <h1>Client Member Page</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  )
}

export default Member
