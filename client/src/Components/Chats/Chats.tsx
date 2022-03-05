import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
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
      console.log(data)
      if (!chats.some((e) => e.name === data.name)) {
        dispatch(openChat(data.sender, data.name, data.receiver));
      }
     
    });
  }, [socket,dispatch]);
  console.log(chats)
  return (
    <div className={style.chats}>
      <AnimatePresence>
        <Chat></Chat>

        {chats?.map((e, i) => {
          console.log(e)
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
