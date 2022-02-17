import React, { useState } from 'react'
import { signUpWithEmail } from '../../../../login-methods'

import './Login.scss'

export default function Login(): JSX.Element {

	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
    try{
      setLoading(true)
      await signUpWithEmail(email,password)
      alert("Usuario creado con exito")
      setLoading(false)
    }catch(err){
      alert(err)
      setLoading(false)
    }
	}

  return (
    <div id="cont">
      <header>
        <div id="title-cont">
          <img src="#" alt="icon" />
          <h1>| Social</h1>
        </div>
        <div id="btns-cont">
          <button id="sign-in">Registrarse</button>
          <button id="log-in">Iniciar sesion</button>
        </div>
      </header>
      <div id="form-cont">
        <form onSubmit={handleSubmit}>
          <h3>Hola, ¡Bienvenida/o a Henry Social!</h3>
          <input type="email" id="email" placeholder="Ingresa tu email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" id="pass" placeholder="Ingresa tu contraseña" onChange={(e)=>{setPassword(e.target.value)}}/>
          <button disabled={loading} type="submit"> Sign Up </button>
        </form>
        <button id="cls-btn">X</button>
        <div id="alt-cont">
          <button id="google-btn">Google</button>
          <button id="github-btn">Github</button>
        </div>
      </div>
    </div>
  )
}
