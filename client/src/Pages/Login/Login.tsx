import React, { useEffect, useState } from "react";
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
import { BsGoogle, BsGithub } from "react-icons/bs";
import { InfoAlert } from "../../Components/Alert/Alert";

enum USER_ACTION {
  register,
  signIn,
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
  });
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(USER_ACTION.register);
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user?.username) navigate("/");
  }, [user]);

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

        if (action == USER_ACTION.register) {
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
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const property = e.target.name;
    if (property === null) throw new Error();
    if (property === "avatar" && e.target.files) {
      setInput({ ...input, avatar: e.target.files[0] });
    } else {
      setInput({ ...input, [property]: e.target.value });
    }
  }

  const handleActionChange = () => {
    const Act = action ? "register" : "signIn";
    setAction(USER_ACTION[Act]);
  };

  return (
    <>
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
            {action === USER_ACTION.register
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
            <input
              type="email"
              id={style.email}
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              type="password"
              id={style.pass}
              name="password"
              placeholder="Contraseña"
              onChange={handleInputChange}
            />
            {action === USER_ACTION.register ? (
              <>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  placeholder="Username"
                />
                <input
                  type="file"
                  name="avatar"
                  onChange={handleInputChange}
                  placeholder="Avatar"
                />
              </>
            ) : (
              <></>
            )}
            <button disabled={loading} type="submit">
              {" "}
              {action === USER_ACTION.register
                ? "Registrate"
                : "Inicia sesión"}{" "}
            </button>
          </form>
          <div id={style.alt_cont}>
            <Button
              className={style.alt_btns}
              onClick={() => handleLogin(signUpWithGmail)}
              style={{ fontWeight: "normal" }}
            >
              {action === USER_ACTION.register ? "Registrate" : "Inicia sesion"}{" "}
              con Google <BsGoogle></BsGoogle>
            </Button>
            <Button
              className={style.alt_btns}
              style={{ fontWeight: "normal" }}
              onClick={() => handleLogin(signUpWithGitHub)}
            >
              {action === USER_ACTION.register ? "Registrate" : "Inicia sesion"}{" "}
              con GitHub <BsGithub></BsGithub>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
