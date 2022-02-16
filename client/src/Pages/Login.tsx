
import React, { useState } from 'react'
import {signUpWithEmail,signUpWithGmail} from '../../../login-methods'

export default function Login() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
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



  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="email"  onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        <button disabled={loading} type="submit"> Sign Up </button>
    </form>
    <button onClick={()=>signUpWithGmail()}>Sign in with Google</button>
    </>
  )
}
