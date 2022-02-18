import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../../../src/services/firebase/firebase';
import { signUpWithEmail, signUpWithGmail, signUpWithGitHub } from '../../../../src/services/firebase/login-methods';
import { IUser } from '../../../../src/models/User';
import { useSelector } from 'react-redux';
import useUser from '../../Hooks/useUser';
import useisLogged from '../../Hooks/useisLogged';

export default function Login() {
  const [input, setInput] = useState<IUser>({
    name: '',
    username: '',
    password: '',
    email: '',
    avatar: '',
    createdAt: {},
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLogged = useisLogged();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!auth.currentUser) {
      alert('Ya estas logeado, redirigiendo a Home');
      navigate('/');
    } else {
      try {
        setLoading(true);

        await signUpWithEmail(input);
        alert('Usuario creado con exito');
        navigate('/');
        setLoading(false);
      } catch (e) {
        alert(e);
        setLoading(false);
      }
    }
  };
  const handleLogin = async (cb: Function) => {
    if (!!auth.currentUser) {
      alert('Ya estas logeado, redirigiendo a Home');
      navigate('/');
    } else {
      try {
        const result = await cb();
        if (!!result) {
          alert('Usuario logueado con exito');
          navigate('/');
        }
      } catch (e) {
        alert(e);
      }
    }
  };
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const property = e.target.name;
    console.log(e);
    if (property === null) throw new Error();
    else {
      setInput({ ...input, [property]: e.target.value });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleInputChange} />
        <input type="password" name="password" onChange={handleInputChange} />
        <input type="text" name="username" onChange={handleInputChange} />
        <input type="text" name="name" onChange={handleInputChange} />
        <input type="text" name="avatar" onChange={handleInputChange} />

        <button disabled={loading} type="submit">
          {' '}
          Sign Up{' '}
        </button>
      </form>
      <button onClick={() => handleLogin(signUpWithGmail)}>Sign in with Google</button>
      <button onClick={() => handleLogin(signUpWithGitHub)}>Sign in with GitHub</button>
    </>
  );
}
