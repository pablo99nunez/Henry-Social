import React, { useState } from "react";
import Button from "../Button/Button";
import style from "./Settings.module.scss";
import { motion } from "framer-motion";
import Input from "../Input/Input";
import useUser from "../../Hooks/useUser";

export default function Settings({ open }: any) {
  const user = useUser();
  const handleSubmit = () => {};
  return (
    open && (
      <div className={style.settings_wrap}>
        <motion.form
          onSubmit={handleSubmit}
          animate={{
            opacity: [0, 1],
            y: [-100, 0],
          }}
          transition={{
            duration: 0.5,
          }}
          className={style.central_settings}
        >
          <div className={style.header}>
            <h1>Edita tu perfil</h1>
            <div className={style.settings_photo}>
              <img
                src={typeof user?.avatar === "string" ? user.avatar : ""}
                alt=""
              />
            </div>
          </div>
          <div className={style.inputBox}>
            <h3>Nombre de usuario</h3>
            <Input
              type="text"
              name=""
              placeholder="Nombre de usuario"
              id=""
              value={user?.username}
            ></Input>
          </div>
          <div className={style.inputBox}>
            <h3>Biografia</h3>
            <Input
              placeholder=" Escribe sobre ti..."
              className={style.text_area}
            ></Input>
          </div>
          <div className={style.buttons}>
            <Button>Estudiante</Button>
            <Button>Instructor</Button>
            <Button>TA</Button>
          </div>

          <Input
            type="text"
            placeholder="    Github"
            className={style.input}
            name="github"
          ></Input>
          <Input
            type="text"
            placeholder="Ingresa tu Linkedin"
            className={style.input}
            name="linkedin"
          ></Input>
          <Input
            type="text"
            placeholder="Ingresa tu portafolio"
            className={style.input}
            name="portfolio"
          ></Input>
          <div className={style.buttons}>
            <Button className={style.submit_button}>Guardar cambios</Button>
            <Button className={style.cancel_button}>Cancelar</Button>
          </div>
        </motion.form>
      </div>
    )
  );
}
