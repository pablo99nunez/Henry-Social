import React, { useEffect, useState, useRef } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import {
  signUpWithEmail,
  signUpWithGmail,
  signUpWithGitHub,
  signInWithEmail,
} from "../../../../src/services/firebase/login-methods";
import { IUser } from "../../../../src/models/User";
import style from "./Login.module.scss";
import useUser from "../../Hooks/useUser";
import Button from "../../Components/Button/Button";
import { InfoAlert } from "../../Components/Alert/Alert";
import LoginInput from "../../Components/LoginInput/LoginInput";
import valForm from "./valForm";
import axios from "axios";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

enum USER_ACTION {
  signUp,
  logIn,
}

export default function Login(): JSX.Element {
  const [input, setInput] = useState<IUser>({
    name: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
    admin: false,
    createdAt: {},
    notifications: [],
  });
  const [errors, setErrors] = useState({
    name: false,
    username: false,
    password: false,
    email: false,
  });
  const [loading, setLoading] = useState(true);
  const [formComplete, setFromComplete] = useState(false);
  const [action, setAction] = useState(USER_ACTION.logIn);
  const navigate = useNavigate();
  const user = useUser();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { name, username, password, email } = input;
    let cleanUp = false;
    if (user !== null) return navigate("/");
    setTimeout(() => {
      if (user === null && !cleanUp) setLoading(false);
    }, 1000);
    name && username && password && email && setFromComplete(true);
    return () => {
      cleanUp = true;
    };
  }, [user, input]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.username) {
      InfoAlert.fire({
        title: "Ya estas logeado, redirigiendo a Home",
        icon: "info",
      });
      navigate("/");
    } else {
      try {
        setLoading(true);

        if (action == USER_ACTION.signUp) {
          await signUpWithEmail(input).then(() => {
            InfoAlert.fire("Usuario creado con exito");
          });
        } else if (input.password != undefined) {
          await signInWithEmail(input.email, input.password);
        }

        navigate("/");
        setLoading(false);
      } catch (e) {
        console.error(e);
        InfoAlert.fire({ title: "Algo salio mal", icon: "error" });
        setLoading(false);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleLogin = async (cb: Function) => {
    if (user?.username) {
      InfoAlert.fire({
        title: "Ya estas logeado, redirigiendo a Home",
        icon: "info",
      });
      navigate("/");
    } else {
      try {
        const result = await cb();
        if (result) {
          InfoAlert.fire({
            title: "Usuario logueado con exito",
            icon: "success",
          });
          // alert("Usuario logueado con exito");
          navigate("/");
        }
      } catch (e) {
        console.error(e);
        InfoAlert.fire({ title: "Algo salio mal", icon: "error" });
      }
    }
  };

  let typerTimer: NodeJS.Timeout;

  function validateUsername(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) {
    const target = e.target as HTMLInputElement;
    axios
      .get("/user", {
        params: {
          username: target.value,
        },
      })
      .then((user) => {
        if (!valForm(target, target.name, user?.data?.username) && user.data) {
          setErrors({
            ...errors,
            [target.name]: true,
          });
          if (btn.current) btn.current.disabled = true;
        } else {
          setErrors({
            ...errors,
            [target.name]: false,
          });
          if (formComplete && btn.current) btn.current.disabled = false;
        }
      });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const property = target.name;
    const isValid = valForm(target, property);

    if (!isValid) {
      setErrors({
        ...errors,
        [property]: true,
      });
      if (btn.current) btn.current.disabled = true;
      return;
    }

    if (property === null) throw new Error();
    if (property === "avatar" && e.target.files) {
      setInput({ ...input, avatar: e.target.files[0] });
    } else {
      setInput({ ...input, [property]: e.target.value });
      setErrors({
        ...errors,
        [property]: false,
      });
    }

    if (formComplete && btn.current) btn.current.disabled = false;
  }

  const handleActionChange = () => {
    const Act = action ? USER_ACTION.signUp : USER_ACTION.logIn;
    setAction(Act);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div id={style.cont}>
          <header>
            <div id={style.title_cont}>
              <img
                src="https://assets.soyhenry.com/assets/LOGO-HENRY-03.png"
                alt="icon"
              />
              <h1> | Social </h1>
            </div>
            <button className={style.act_btn} onClick={handleActionChange}>
              {" "}
              {action === USER_ACTION.signUp
                ? "Iniciar sesión"
                : "Registrarse"}{" "}
            </button>
          </header>
          <div id={style.form_cont}>
            <form onSubmit={handleSubmit}>
              <h1>
                {" "}
                Hola, ¡Bienvenida/o a <strong>Henry Social!</strong>
              </h1>
              <LoginInput
                valid={!errors.email}
                id="email"
                title="example@gmail.com"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
              <LoginInput
                valid={!errors.password}
                id="password"
                title="8 characters long: numbers, 1 uppercase is required"
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleInputChange}
              />
              {action === USER_ACTION.signUp ? (
                <>
                  <LoginInput
                    valid={!errors.username}
                    id="username"
                    type="text"
                    title="The username must be unique, 3 characters long, and not special characteres"
                    name="username"
                    onChange={handleInputChange}
                    onKeyUp={(e) => {
                      clearTimeout(typerTimer);
                      typerTimer = setTimeout(() => validateUsername(e), 1000);
                    }}
                    onKeyDown={() => {
                      clearTimeout(typerTimer);
                    }}
                    onBlur={validateUsername}
                    placeholder="Username"
                  />
                  <LoginInput
                    valid={!errors.name}
                    id="name"
                    type="text"
                    title="The names must start with a capital letter"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Nombre"
                  />
                  <LoginInput
                    id="avatar"
                    type="file"
                    name="avatar"
                    onChange={handleInputChange}
                    placeholder="Avatar"
                  />
                </>
              ) : (
                <></>
              )}
              <button disabled={loading} type="submit" ref={btn}>
                {" "}
                {action === USER_ACTION.signUp
                  ? "Registrate"
                  : "Inicia sesión"}{" "}
              </button>
            </form>
            <div id={style.alt_cont}>
              <Button
                onClick={() => handleLogin(signUpWithGmail)}
                style={{ fontWeight: "normal" }}
              >
                {action === USER_ACTION.signUp ? "Registrate" : "Inicia sesion"}{" "}
                con Google <BsGoogle></BsGoogle>
              </Button>
              <Button
                style={{ fontWeight: "normal" }}
                onClick={() => handleLogin(signUpWithGitHub)}
              >
                {action === USER_ACTION.signUp ? "Registrate" : "Inicia sesion"}{" "}
                con GitHub <BsGithub></BsGithub>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
