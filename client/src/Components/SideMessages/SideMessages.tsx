import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../../src/services/firebase/firebase";
import useUser from "../../Hooks/useUser";
import { getOnlineUsers, openChat } from "../../redux/actions/actions";
import { IState } from "../../redux/reducer";
import Avatar from "../Avatar/Avatar";
import style from "./SideMessages.module.scss";
const SideMessages = () => {
  const socket = useSelector((state: IState) => state.socket);
  const users = useSelector((state: IState) => state.usersOnline);
  const dispatch = useDispatch();
  const user = useUser();
  useEffect(() => {
    socket?.on("get_users", (usersSocket) => {
      dispatch(getOnlineUsers(usersSocket));
    });
  }, [socket]);

  return (
    <aside className={style.aside_messages}>
      <h2>Mensajes</h2>
      <div className={style.aside_resume_messages}>
        {users?.map(
          (e: any, i: number) =>
            e.userId !== user?._id && (
              <div
                key={i}
                className={style.user}
                onClick={() => dispatch(openChat(e.username, e.name))}
              >
                <Avatar avatar={e.avatar}></Avatar>
                <div>
                  <h3> {e.name} </h3>
                </div>
              </div>
            )
        )}
      </div>
    </aside>
  );
};

export default SideMessages;
