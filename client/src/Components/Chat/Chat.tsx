import React, { useEffect, useRef, useState } from "react";
import useUser from "../../Hooks/useUser";
import io from "socket.io-client";
import style from "./Chat.module.scss";
import { BiChevronsUp } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";

const Chat = () => {
  const socket = useSelector((state: IState) => state.socket);
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollToMe = useRef<HTMLDivElement>(null);
  const [listMessage, setListMessage] = useState<any[]>([]);

  const handleClick = (e: any) => {
    setOpen(!open);
  };

  const SendMessage = () => {
    if (message) {
      const messageData = {
        author: user?.username,
        name: user?.name,
        avatar: user?.avatar,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setListMessage([...listMessage, messageData]);
      setMessage("");
    }
  };
  useEffect(() => {
    //Traer los mensajes previos
    const list = localStorage.getItem("ChatGlobal");
    if (typeof list === "string") setListMessage(JSON.parse(list));

    socket.on("receive_message", (data) => {
      setArrivalMessage(data);
    });
  }, []);
  useEffect(() => {
    arrivalMessage && setListMessage([...listMessage, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    localStorage.setItem("ChatGlobal", JSON.stringify(listMessage));
    scrollToMe.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  return (
    <>
      <motion.div
        initial={{ y: 375 }}
        animate={
          open
            ? {
                y: 0,
              }
            : { y: 375 }
        }
        className={style.chat_window}
      >
        <div onClick={(e) => handleClick(e)} className={style.chat_header}>
          <p>Live Chat</p>
          <motion.div animate={!open ? { rotateZ: 0 } : { rotateZ: 180 }}>
            <BiChevronsUp></BiChevronsUp>
          </motion.div>
        </div>
        <div className={style.chat_body}>
          {listMessage.map((msg) => (
            <div
              className={style.message}
              ref={scrollToMe}
              id={
                user?.username === msg.author
                  ? `${style.you}`
                  : `${style.other}`
              }
            >
              <Avatar avatar={msg.avatar}></Avatar>
              <div className={style.message_wrap}>
                <p>
                  <strong>{msg.name}</strong>
                </p>
                <div className={style.message_content}>
                  <p>{msg.message}</p>
                </div>
                <div className={style.message_meta}>
                  <p id={style.time}>{msg.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={style.chat_footer}>
          <input
            type="text"
            value={message}
            placeholder="Type Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && SendMessage();
            }}
          />
          <button onClick={SendMessage}>&#9658;</button>
        </div>
      </motion.div>
      )
    </>
  );
};

export default Chat;
