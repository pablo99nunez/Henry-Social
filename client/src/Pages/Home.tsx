import React, { useEffect } from 'react'
import { auth } from '../../../src/services/firebase/firebase'
import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!auth.currentUser){
      navigate("/login")
    }
  })
  return (
    <div><h1>HOME</h1></div>
  )
}
