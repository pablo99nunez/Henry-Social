
import React, {  useEffect, useState } from 'react'
import { auth } from '../../../firebase'
import {signUpWithEmail,signUpWithGmail,signUpWithGitHub} from '../../../login-methods'




export default function Login() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

    if(!!auth.currentUser){
      alert("Ya estas logeado, redirigiendo a Home")
    }else{

      try{
        setLoading(true)
        await signUpWithEmail(email,password)
        alert("Usuario creado con exito")
        setLoading(false)
      }catch(e){
        alert(e)
        setLoading(false)
      }
    }
	}
  const handleLogin = async (cb:Function)=>{
    if(!!auth.currentUser){
      alert("Ya estas logeado, redirigiendo a Home")
    }else{

      try{
        const result= await cb()
        if(!!result){
          alert("Usuario logueado con exito")
        }
      }catch(e){
        alert(e)
      }
    }
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="email"  onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        <button disabled={loading} type="submit"> Sign Up </button>
    </form>
    <button onClick={()=>handleLogin(signUpWithGmail)}>Sign in with Google</button>
    <button onClick={()=>handleLogin(signUpWithGitHub)}>Sign in with GitHub</button>
    </>
  )
}
