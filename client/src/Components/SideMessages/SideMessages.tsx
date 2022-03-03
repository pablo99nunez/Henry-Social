import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import style from "./SideMessages.module.scss";
const SideMessages = () => {
  const socket = useSelector((state: IState) => state.socket);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("get_users", (users) => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <aside className={style.aside_messages}>
      <h2>Mensajes</h2>
      <div className={style.aside_resume_messages}>
        <div className={style.aside_message_img}></div>
        {users?.map((e: any, i: number) => {
          return <p key={i}>{e.userId}</p>;
        })}
      </div>
    </aside>
  );
};

export default SideMessages;
