import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
const Nav = async() => {
  const session=await getServerSession(options)
  console.log("session",session)
  return (
    <header className='min-w-full bg-gray-600 text-grey-100'>
      <nav className='flex justify-between items-center w-full px-10 py-4'>
        <div>Logo</div>
        <div className='flex gap-10'>
            <Link href="/">Home</Link>
            <Link href="/User">Create User</Link>
            <Link href="/ClientMember">Client Member</Link>
            <Link href="/Member">Member</Link>
            <Link href="/Public">public</Link>
           {
           session
           ?<Link href='/api/auth/signout?callbackUrl=/'>Logout</Link>
           :<Link href='/api/auth/signin'>Login</Link>
           }
        </div>
       

      </nav>
    </header>
  )
}

export default Nav
