import React from "react";
import style from "./SideMessages.module.scss";
const SideMessages = () => {
  return (
    <aside className={style.aside_messages}>
      <h2>Mensajes</h2>
      <div className={style.aside_resume_messages}>
        <div className={style.aside_message_img}></div>
        <div className={style.aside_message_name}>
          <p>Pablo Nuñez</p>
          <span>Hola! como est...</span>
        </div>
      </div>
    </aside>
  );
};

export default SideMessages;
