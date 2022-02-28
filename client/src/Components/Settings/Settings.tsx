import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../Button/Button";
import style from "./Settings.module.scss";
import Input from "../Input/Input";
import useUser from "../../Hooks/useUser";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import { InfoAlert } from "../Alert/Alert";

export default function Settings({ cancel }: any) {
  const user = useUser();
  const navigate = useNavigate();
  const btn = useRef<HTMLButtonElement>(null);

  const [changes, setChanges] = useState({
    username: user?.username,
    bio: user?.bio,
    linkedin: user?.linkedin,
    github: user?.github,
    portfolio: user?.portfolio,
    role: user?.role,
  });

  const handleChanges = (e: any): void => {
    if (btn.current) {
      if (e.target.name === "username" && e.target.value.length === 0) {
        btn.current.disabled = true;
        throw new Error("The username field can't be empty");
      }

      btn.current.disabled = false;

      setChanges({
        ...changes,
        [e.target.name]: e.target.value.length === 0 ? null : e.target.value,
      });
    }
  };

  const saveChanges = (e: any) => {
    e.preventDefault();
    axios
      .put("/user", {
        _id: user?._id,
        changes,
      })
      .then((r) => {
        cancel(e);
        InfoAlert.fire({
          title: "Se actualizó tu perfil!",
          icon: "success",
        });
        navigate(`/profile/${changes.username}`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        InfoAlert.fire({
          title: "No se pudo actulizar tu perfil",
          icon: "error",
        });
        cancel(e);
      });
  };

  const onChangeRole = (e: any): void => {
    setChanges({
      ...changes,
      role: e.target.value,
    });
  };

  return (
    <form className={style.settings_wrap}>
      <Avatar avatar={user?.avatar} />
      <div>
        <div className={style.inputBox}>
          <h3>Nombre de usuario</h3>
          <Input
            onChange={handleChanges}
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            defaultValue={changes?.username}
          ></Input>
        </div>
        <div className={style.inputBox}>
          <h3>Biografia</h3>
          <Input
            onChange={handleChanges}
            name="bio"
            placeholder="Escribe sobre ti..."
            defaultValue={changes?.bio}
          ></Input>
        </div>
        <div className={style.buttons}>
          <Button
            type="button"
            active={changes?.role === "Estudiante"}
            onClick={onChangeRole}
            value="Estudiante"
          >
            Estudiante
          </Button>
          <Button
            type="button"
            active={changes?.role === "Instructor"}
            onClick={onChangeRole}
            value="Instructor"
          >
            Instructor
          </Button>
          <Button
            type="button"
            active={changes?.role === "TA"}
            onClick={onChangeRole}
            value="TA"
          >
            TA
          </Button>
        </div>

        <Input
          type="text"
          name="github"
          onChange={handleChanges}
          placeholder="Ingresa tu Usuario de Github"
          defaultValue={changes?.github}
        ></Input>
        <Input
          type="text"
          onChange={handleChanges}
          placeholder="Ingresa tu Usuario de Linkedin"
          name="linkedin"
          defaultValue={changes?.linkedin}
        ></Input>
        <Input
          type="text"
          onChange={handleChanges}
          placeholder="Ingresa la Url de tu portafolio"
          name="portfolio"
          defaultValue={changes?.portfolio}
        ></Input>
        <div className={style.buttons}>
          <Button
            type="submit"
            ref={btn}
            backgroundColor="#000"
            onClick={saveChanges}
          >
            Guardar cambios
          </Button>
          <Button onClick={cancel} backgroundColor="#FF1">
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
