import React, { useEffect, useRef, useState } from "react";
import useUser from "../../Hooks/useUser";
import style from "./PrivateChat.module.scss";
import { IMessage } from "../../../../src/models/Conversation";
import { BiChevronsUp } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import Avatar from "../Avatar/Avatar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import pop from "../../assets/sounds/pop2.wav";
import { IState } from "../../redux/reducer";
import { closeChat } from "../../redux/actions/actions";
import axios from "axios";

type Props = {
  name: string;
  username: string;
  userB: string;
};

const PrivateChat = ({ name, username, userB }: Props) => {
  const socket = useSelector((state: IState) => state.socket);
  const dispatch = useDispatch();
  const [play] = useSound(pop);
  const user = useUser();
  const input = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const [newMessage, setNewMessage] = useState(0);
  const scrollToMe = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLDivElement>(null);
  const [listMessage, setListMessage] = useState<any[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (e: any) => {
    e.target !== close.current && setOpen(!open);
  };

  function getTime(): string {
    const hours =
      new Date(Date.now()).getHours().toString().length == 1
        ? `0${new Date(Date.now()).getHours()}`
        : new Date(Date.now()).getHours();
    const minutes =
      new Date(Date.now()).getMinutes().toString().length == 1
        ? `0${new Date(Date.now()).getMinutes()}`
        : new Date(Date.now()).getMinutes();
    return hours + ":" + minutes;
  }

  const SendMessage = async () => {
    if (
      message 
    ) {
      console.log("informacion del mensjae",message)
      console.log("user B",userB)
      console.log("user id",user?._id)
      const messageData = {
        receiver: userB,
        sender: user?._id,
        name: user?.name,
        avatar: user?.avatar,
        message: message,
        time: getTime(),
      } as IMessage;
      await axios.post("/conversation/message", messageData);
      console.log("Enviando mensaje desde cliente");
      socket.emit("send_private_message", messageData);
      setListMessage([...listMessage, messageData]);
      setMessage("");
    }
  };
  useEffect(() => {
    if (user?._id) {
      axios
        .post("/conversation/find", { userA: user._id, userB })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setListMessage(res.data.messages);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    console.log("useChat",chat)
    chat.current?.addEventListener("mouseenter", () => {
      setIsHovering(true);
    });
    chat.current?.addEventListener("mouseleave", () => {
      setIsHovering(false);
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
    socket.on("receive_private_message", (data) => {
      console.log("recibiendo mensaje", "Mensaje", data.message,"id del sender", data.sender);
      if (data.sender === userB) {
        setArrivalMessage(data);
        play();
      }
    });

    scrollToMe.current?.scrollIntoView({ block: "end" });
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
        ref={chat}
        exit={{
          rotateX: -90,
          originY: 1,
          perspective: 100,
          transition: {
            bounce: 0.1,
          },
        }}
      >
        <div
          onClick={(e) => handleClick(e)}
          className={`${newMessage !== 0 && style.newMessage} ${
            style.chat_header
          } `}
        >
          <p>{name}</p>
          <motion.div animate={!open ? { rotateZ: 0 } : { rotateZ: 180 }}>
            <BiChevronsUp></BiChevronsUp>
          </motion.div>
          {isHovering && (
            <motion.div
              className={style.close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ color: "#ff2f2b" }}
              ref={close}
              onClick={() => dispatch(closeChat(username))}
            >
              <AiFillCloseCircle />
            </motion.div>
          )}
          <div className={style.number}>{newMessage !== 0 && newMessage}</div>
        </div>
        <div className={style.chat_body}>
          {listMessage.map((msg, i) => (
            <motion.div
              ref={scrollToMe}
              key={i}
              initial={{ scale: 1, rotateZ: 20 }}
              animate={{ scale: 1, rotateZ: 0 }}
              transition={{
                type: "tween",
              }}
              className={`${style.message} ${
                user?._id === msg.sender ? style.you : style.other
              }`}
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
              if (e.target.value.slice(-1) === "\n")  SendMessage();
              setMessage(e.target.value);
            }}
            ref={input}
          />
          <IoSend onClick={SendMessage}></IoSend>
        </div>
      </motion.div>
    </>
  );
};

export default PrivateChat;
