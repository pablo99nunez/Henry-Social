import React, { useEffect, useRef, useState } from "react";
import useUser from "../../Hooks/useUser";
import io from "socket.io-client";
import style from "./Chat.module.scss";
import { BiChevronsUp } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import Avatar from "../Avatar/Avatar";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";

const Chat = () => {
  const socket = useSelector((state: IState) => state.socket);
  const user = useUser();
  const input = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const [newMessage, setNewMessage] = useState(0);
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

      socket?.emit("send_message", messageData);
      setListMessage([...listMessage, messageData]);
      setMessage("");
    }
  };
  useEffect(() => {
    //Traer los mensajes previos
    const list = localStorage.getItem("ChatGlobal");
    if (typeof list === "string") setListMessage(JSON.parse(list));

    socket?.on("receive_message", (data) => {
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setListMessage([...listMessage, arrivalMessage]);
      !open && setNewMessage(newMessage + 1);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (open) {
      input.current?.focus();
      setNewMessage(0);
    }
  }, [open]);
  useEffect(() => {
    localStorage.setItem("ChatGlobal", JSON.stringify(listMessage));
    scrollToMe.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  return (
    <>
      <motion.div
        initial={{ y: 580 }}
        animate={
          open
            ? {
                y: 0,
              }
            : { y: 580 }
        }
        className={style.chat_window}
      >
        <div
          onClick={(e) => handleClick(e)}
          className={`${style.chat_header} ${newMessage && style.newMessage}`}
        >
          <p>Live Chat</p>
          <motion.div animate={!open ? { rotateZ: 0 } : { rotateZ: 180 }}>
            <BiChevronsUp></BiChevronsUp>
          </motion.div>
          <div className={style.number}>{newMessage != 0 && newMessage}</div>
        </div>
        <div className={style.chat_body}>
          {listMessage.map((msg) => (
            <motion.div
              className={style.message}
              ref={scrollToMe}
              initial={{ scale: 1, rotateZ: 20 }}
              animate={{ scale: 1, rotateZ: 0 }}
              transition={{
                type: "tween",
              }}
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
            </motion.div>
          ))}
        </div>
        <div className={style.chat_footer}>
          <textarea
            value={message}
            placeholder="Escribe algo..."
            onChange={(e) => {
              if (e.target.value.slice(-1) === "\n") return SendMessage();
              setMessage(e.target.value);
            }}
            ref={input}
            /* onKeyPress={(e) => {
              e.key === "Enter" && SendMessage();
            }} */
          />
          <IoSend onClick={SendMessage}></IoSend>
        </div>
      </motion.div>
    </>
  );
};

export default Chat;
