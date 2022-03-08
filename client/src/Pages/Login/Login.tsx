import React, { useEffect, useState, useRef } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Helmet } from "react-helmet";

import {
  signUpWithEmail,
  signUpWithGmail,
  signUpWithGitHub,
  signInWithEmail,
} from "../../../src/firebase/login-methods";
import style from "./Login.module.scss";
import useUser from "../../Hooks/useUser";
import Button from "../../Components/Button/Button";
import { InfoAlert } from "../../Components/Alert/Alert";
import LoginInput from "../../Components/LoginInput/LoginInput";
import Modal from "../../Components/Modal/Modal";
import ResetPassword from "../../Components/ResetPassword/ResetPassword";
import valForm from "./valForm";
import axios from "axios";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";


let userExists: boolean;

export default function Login({ USER_ACTION, action, handleActionChange}: any): JSX.Element {
  const [input, setInput] = useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
    admin: false,
    createdAt: {},
    notifications: [],
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    email: false,
  });
  const [loading, setLoading] = useState(true);
  const [formComplete, setFromComplete] = useState(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { firstName, lastName, username, password, email } = input;
    let cleanUp = false;
    if (user !== null) return navigate("/");
    setTimeout(() => {
      if (user === null && !cleanUp) setLoading(false);
    }, 1000);
    if (action === 1) {
      email && password && setFromComplete(true);
    } else {
      if (
        firstName &&
        lastName &&
        username &&
        !userAlreadyExist &&
        password &&
        email
      ) {
        if (btn.current) btn.current.disabled = false;
        return setFromComplete(true);
      }
      if (btn.current) btn.current.disabled = true;
      setFromComplete(false);
    }
    return () => {
      cleanUp = true;
    };
  }, [user, input, userAlreadyExist, formComplete]);

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
          const newUser = {
            ...input,
            name: `${input.firstName.trim()} ${input.lastName.trim()}`,
          };
          delete newUser.firstName;
          delete newUser.lastName;
          await signUpWithEmail(newUser).then(() => {
            InfoAlert.fire("Usuario creado con exito");
            navigate("/verification");
          });
        } else if (input.password != undefined) {
          await signInWithEmail(input.email, input.password);
        }
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
    if (!target.value.length) return;
    axios
      .get("/user", {
        params: {
          username: target.value,
        },
      })
      .then((user) => {
        userExists = !valForm(target, target.name, user?.data?.username);
        setUserAlreadyExist(userExists);
        if (userExists && user.data) {
          setErrors({
            ...errors,
            [target.name]: true,
          });
          if (btn.current) btn.current.disabled = true;
        }
        if (formComplete && btn.current) btn.current.disabled = false;
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
      setNewAvatar(URL.createObjectURL(e.target.files[0]));
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

  const resetPassword = () => {
    setPassword(true);
  }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div id={style.cont}>
           <Helmet>
            <meta charSet="utf-8"/>
            <meta name={`Página de ${action ? 'Inicio de sesión' : 'registro'} | Henry Social`}  content="Formulario"/>
            <title>{action ? 'Iniciar Sesion' : ' Registrate'} | Henry Social</title>
          </Helmet>
          <header>
            <Link to="/landing">
              <div id={style.title_cont}>
                <img
                  src="https://assets.soyhenry.com/assets/LOGO-HENRY-03.png"
                  alt="icon"
                />
                <h1> | Social </h1>
              </div>
            </Link>
            <button className={style.act_btn} onClick={handleActionChange}>
              {" "}
              {action === USER_ACTION.signUp
                ? "Iniciar sesión"
                : "Registrarse"}{" "}
            </button>
          </header>
          <Modal isOpen={password} setIsOpen={setPassword} title="Reestablecer contraseña">
        <ResetPassword
          cancel={(e?: any) => {
            e && e.preventDefault();
            return setPassword(false);
          }}
        />
      </Modal>
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
                title="Mínimo 8 caracteres, obligatorio un número y una mayúscula."
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
                    title="Este campo no puede estar vacio, no debe tener caracteres especiales, mínimo tres de largo y debe ser único."
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
                    valid={!errors.firstName}
                    id="firstname"
                    type="text"
                    title="Los nombres deben empezar con mayúscula."
                    name="firstName"
                    onChange={handleInputChange}
                    placeholder="Nombres"
                  />
                  <LoginInput
                    valid={!errors.lastName}
                    id="lastName"
                    type="text"
                    title="Los nombres deben empezar con mayúscula."
                    name="lastName"
                    onChange={handleInputChange}
                    placeholder="Apellidos"
                  />
                  <div id={style.avt_cont}>
                    <img
                      src={
                        newAvatar ||
                        (typeof user?.avatar === "string" && user?.avatar) ||
                        "https://s5.postimg.cc/537jajaxj/default.png"
                      }
                      alt="avatar"
                    />
                    <label htmlFor="newAvatar" id={style.editIcon}>
                      <IconContext.Provider
                        value={{ color: "yellow", size: "25px" }}
                      >
                        <BiEdit />
                      </IconContext.Provider>
                    </label>
                    <input
                      // ref={imgInput}
                      name="avatar"
                      id="newAvatar"
                      onChange={handleInputChange}
                      type="file"
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              <div>
                {
                  action === USER_ACTION.signUp ? <> </>
                  : <a onClick={resetPassword} className={style.forgotPassword}>Olvidaste tu contraseña?</a>
                }
              </div>
              <div>
              <button disabled={loading} type="submit" ref={btn}>
                {" "}
                {action === USER_ACTION.signUp
                  ? "Registrate"
                  : "Inicia sesión"}{" "}
              </button>
              </div>
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
