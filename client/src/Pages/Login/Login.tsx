
import React, {  useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {auth} from '../../../../src/services/firebase/firebase'
import {signUpWithEmail,signUpWithGmail,signUpWithGitHub} from '../../../../src/services/firebase/login-methods'
import {IUser} from '../../../../src/models/User'

export default function Login() {

	const [input,setInput] = useState<IUser> ({
    name:"",
    username:"",
    password:"",
    email:"",
    avatar:"",
    createdAt: {}
  })
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()

  useEffect(()=>{
    if(!!auth.currentUser){
      navigate("/home")
      
    }else console.log()
  },[])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

    if(!!auth.currentUser){
      alert("Ya estas logeado, redirigiendo a Home")
      navigate("/home")
    }else{

      try{
        setLoading(true)
        
        await signUpWithEmail(input)
        alert("Usuario creado con exito")
        navigate("/home")
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
      navigate("/home")
    }else{

      try{
        const result= await cb()
        if(!!result){
          alert("Usuario logueado con exito")
          navigate("/home")
        }
      }catch(e){
        alert(e)
      }
    }
  }
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
    const property=e.target.name
    console.log(e)
    if(property===null) throw new Error() 
    else{

      setInput({...input,
                 [property]:e.target.value}
                )
        
      }
    
  }

  return (
    <>

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
          <input type="email" id="email" name="email" placeholder="Ingresa tu email" onChange={handleInputChange}/>
          <input type="password" id="pass" name="password" placeholder="Ingresa tu contraseña" onChange={handleInputChange}/>
          <button disabled={loading} type="submit"> Sign Up </button>
        </form>
        <button id="cls-btn">X</button>
        <div id="alt-cont">
          <button id="google-btn">Google</button>
          <button id="github-btn">Github</button>
        </div>
      </div>
    </div>
    
    {/* <form onSubmit={handleSubmit}>
        <input type="email" name="email"  onChange={handleInputChange}/>
        <input type="password" name="password"  onChange={handleInputChange}/>
        <input type="text"  name="username" onChange={handleInputChange}/>
        <input type="text"  name="name" onChange={handleInputChange}/>
        <input type="text"  name="avatar" onChange={handleInputChange}/>
        
        <button disabled={loading} type="submit"> Sign Up </button>
    </form>
    <button onClick={()=>handleLogin(signUpWithGmail)}>Sign in with Google</button>
    <button onClick={()=>handleLogin(signUpWithGitHub)}>Sign in with GitHub</button> */}
    </>
  )
}
