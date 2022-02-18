import React, {  useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { auth } from '../../../../src/services/firebase/firebase'
import { signUpWithEmail, signUpWithGmail, signUpWithGitHub } from '../../../../src/services/firebase/login-methods'
import { IUser } from '../../../../src/models/User'
import style from './Login.module.scss';

enum USER_ACTION  {
  register,
  signUp
}

export default function Login(): JSX.Element {

	const [ input, setInput ] = useState<IUser> ({
    name: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
    createdAt: {}
  })
  const [ loading, setLoading ] = useState(false)
  const [ action, setAction ] = useState(USER_ACTION.signUp)
  const navigate = useNavigate()

  useEffect(() => {
    if(!!auth.currentUser) navigate("/home")
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

    if(!!auth.currentUser){
      alert("Ya estas logeado, redirigiendo a Home")
      navigate("/home")
    } else {
      try {
        setLoading(true)
        await signUpWithEmail(input)
        alert("Usuario creado con exito")
        navigate("/home")
        setLoading(false)
      } catch(e) {
        alert(e)
        setLoading(false)
      }
    }
	}

  const handleLogin = async (cb: Function)=>{
    if(!!auth.currentUser){
      alert("Ya estas logeado, redirigiendo a Home")
      navigate("/home")
    } else {
      try {
        const result= await cb()
        if(!!result){
          alert("Usuario logueado con exito")
          navigate("/home")
        }
      } catch(e) {
        alert(e)
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    const property = e.target.name
    if(property === null) throw new Error() 
    else {
      setInput({
        ...input,
        [property]:e.target.value
      })
    }
  }

  const handleActionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const Act = action ? "register" : "signUp"
    setAction(USER_ACTION[Act]);
  }

  return (
    <>
    <div id={style.cont}>
      <header>
        <div id={style.title_cont}>
          <img src="#" alt="icon" />
          <h1> | Social </h1>
        </div>
        <button className={style.act_btn}
          onClick={handleActionChange}
        > {action ? "Iniciar sesión" : "Registrarse"} </button>
      </header>
      <div id={style.form_cont}>
        <form onSubmit={handleSubmit}>
          <h3> Hola, ¡Bienvenida/o a Henry Social! </h3>
          <input type="email" id={style.email} name="email" placeholder="Email" onChange={handleInputChange}/>
          <input type="password" id={style.pass} name="password" placeholder="Contraseña" onChange={handleInputChange}/>
          {
            action ? 
            <>
              <input type="text" name="name" onChange={handleInputChange} placeholder="Nombre"/>
              <input type="text" name="username" onChange={handleInputChange} placeholder="Username"/>
              <input type="text" name="avatar" onChange={handleInputChange} placeholder="Avatar"/>
            </>
            : <></>
          }
          <button disabled={loading} type="submit"> { action ? "Registrate" : "Inicia sesión"} </button>
        </form>
        <div id={style.alt_cont}>
          <button className={style.alt_btns}
            onClick={() => handleLogin(signUpWithGmail)}
          > With Google </button>
          <button className={style.alt_btns}
            onClick={() => handleLogin(signUpWithGitHub)}
          > With Github </button>
        </div>
      </div>
    </div>
    </>
  )
}
