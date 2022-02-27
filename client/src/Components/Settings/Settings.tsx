import { useEffect, useState } from "react";
import Button from "../Button/Button";
import style from "./Settings.module.scss";
import Input from "../Input/Input";
import useUser from "../../Hooks/useUser";
import Avatar from "../Avatar/Avatar";

export default function Settings({ cancel }: any) {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={style.settings_wrap}>
      <Avatar avatar={user?.avatar}/>
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
          <Input 
            placeholder="Escribe sobre ti..."
            defaulValue={user?.bio}></Input>
        </div>
        <div className={style.buttons}>
          <Button active={user?.role === "Estudiante"}>Estudiante</Button>
          <Button active={user?.role === "Instructor"}>Instructor</Button>
          <Button active={user?.role === "TA"}>TA</Button>
        </div>

        <Input 
          type="text" 
          name="github"
          placeholder="Ingresa tu Usuario de Github" 
          >{user?.github}</Input>
        <Input
          type="text"
          placeholder="Ingresa tu Usuario de Linkedin"
          name="linkedin"
        >{user?.linkedin}</Input>
        <Input
          type="text"
          placeholder="Ingresa la Url de tu portafolio"
          name="portfolio"
        >{user?.linkedin}</Input>
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
