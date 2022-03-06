import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../redux/actions/actions";
import { IState } from "../../redux/reducer";
import Chat from "../Chat/Chat";
import PrivateChat from "../PrivateChat/PrivateChat";
import style from "./Chats.module.scss";

export default function Chats() {
  const chats = useSelector((state: IState) => state.chats);
  const dispatch = useDispatch();
  const socket = useSelector((state: IState) => state.socket);
  useEffect(() => {
    socket?.on("receive_private_message", (data) => {
      if (!chats.some((e) => e.username === data.username)) {
        console.log(data);
        dispatch(openChat(data.sender, data.name, data.receiver));
      }
    });
  }, []);
  return (
    <div className={style.chats}>
      <AnimatePresence>
        <Chat></Chat>
        {chats?.map((e, i) => {
          return (
            <PrivateChat
              username={e.username}
              key={i}
              name={e.name}
              userB={e.userB}
            ></PrivateChat>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
