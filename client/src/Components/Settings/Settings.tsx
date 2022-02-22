import React, { useState } from "react";
import Button from "../Button/Button";
import style from "./Settings.module.scss";
import Input from "../Input/Input";
import useUser from "../../Hooks/useUser";

export default function Settings({ cancel }: any) {
  const user = useUser();

  return (
    <div className={style.settings_wrap}>
      <img
        src={typeof user?.avatar === "string" ? user.avatar : ""}
        alt="user avatar"
      />
      <div>
        <div className={style.inputBox}>
          <h3>Nombre de usuario</h3>
          <Input
            type="text"
            name=""
            placeholder="Nombre de usuario"
            id=""
            defaultValue={user?.username}
          ></Input>
        </div>
        <div className={style.inputBox}>
          <h3>Biografia</h3>
          <Input placeholder="Escribe sobre ti..."></Input>
        </div>
        <div className={style.buttons}>
          <Button active={user?.role === "Estudiante"}>Estudiante</Button>
          <Button active={user?.role === "Instructor"}>Instructor</Button>
          <Button active={user?.role === "TA"}>TA</Button>
        </div>

        <Input type="text" placeholder="Github" name="github"></Input>
        <Input
          type="text"
          placeholder="Ingresa tu Linkedin"
          name="linkedin"
        ></Input>
        <Input
          type="text"
          placeholder="Ingresa tu portafolio"
          name="portfolio"
        ></Input>
        <div className={style.buttons}>
          <Button className={style.submit_button}>Guardar cambios</Button>
          <Button
            className={style.cancel_button}
            onClick={() => cancel()}
            active
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
