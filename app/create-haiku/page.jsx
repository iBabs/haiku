import React from 'react'
import { getUser } from '../lib/getUser'
import { redirect } from 'next/navigation'
import HaikuForm from '../Components/HaikuForm'

export const metadata = {
  title: 'Create Haiku',
  description: 'Create a Haiku',
}

export default async function page() {

  const user = await getUser()
 
  if(!user){
    return redirect('/')
  }

  return (
    <div className='h-dvh flex-auto flex flex-col justify-center items-center space-y-4'>
      <h2 className='text-center text-4xl font-atma text-cyan-500'>Create an Haiku</h2>
    <p>Fill in the form to input the appropriate things to create your Haiku</p>
        <HaikuForm action="create"/>

    </div>
  )
}
