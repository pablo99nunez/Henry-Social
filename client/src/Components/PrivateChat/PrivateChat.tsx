import React, { useEffect, useRef, useState } from "react";
import useUser from "../../Hooks/useUser";
import style from "./PrivateChat.module.scss";
import { IMessage } from "../../../../src/models/Conversation";
import { BiChevronsUp } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import Avatar from "../Avatar/Avatar";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import { closeChat } from "../../redux/actions/actions";
import song from "../../assets/sounds/facebook-pop.mp3"
import Picker from 'emoji-picker-react';
import axios from "axios";

type Props = {
  name: string;
  userB: string;
  opened?: boolean;
};

const PrivateChat = ({ name, userB }: Props) => {
  const socket = useSelector((state: IState) => state.socket);
  const dispatch = useDispatch();
  const user = useUser();
  const input = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const [newMessage, setNewMessage] = useState(0);
  const scrollToMe = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLDivElement>(null);
  const [listMessage, setListMessage] = useState<any[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClick = (e: any) => {
    e.target !== close.current && setOpen(!open);
  };

  const audio = new Audio(song);

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

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event:any,emojiObject:any) => {
    setChosenEmoji(emojiObject.emoji);
    if(!chosenEmoji) return;
    console.log(chosenEmoji)
    setMessage(prev => prev+chosenEmoji)
  };
  const Toggle = () => {
    setToggle(!toggle)
    console.log(toggle)
  }

  const SendMessage = async () => {
    if (
      message &&
      user?.username &&
      typeof user.avatar === "string" &&
      user.name &&
      !sending
    ) {
      setSending(true);
      const messageData = {
        receiver: userB,
        sender: user._id,
        name: user.name,
        avatar: user.avatar,
        message: message,
        time: getTime(),
      } as IMessage;

      await axios.post("/conversation/message", messageData);

      console.log("Enviando mensaje desde cliente");
      socket?.emit("send_private_message", messageData);
      setListMessage([...listMessage, messageData]);
      setMessage("");
      setSending(false);
    }
  };
  useEffect(() => {
    //Traer los mensajes previos
    /* const list = localStorage.getItem("ChatGlobal");
    if (typeof list === "string") setListMessage(JSON.parse(list));
 */
    if (user?._id) {
      axios
        .post("/conversation/find", { userA: user._id, userB })
        .then((res) => {
          if (res.data) {
            setListMessage(res.data.messages);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);

  useEffect(() => {
    chat.current?.addEventListener("mouseenter", () => {
      setIsHovering(true);
    });
    chat.current?.addEventListener("mouseleave", () => {
      setIsHovering(false);
    });
  }, []);

  useEffect(() => {
    socket?.on("receive_private_message", (data) => {
      audio.play()
      console.log("recibiendo mensaje", data, data.sender);
      if (data.sender === userB) {
        setArrivalMessage(data);
      }
    });
  }, [socket]);

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
    /* localStorage.setItem("ChatGlobal", JSON.stringify(listMessage)); */
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
              onClick={() => dispatch(closeChat(userB))}
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
              if (e.target.value.slice(-1) === "\n") return SendMessage();
              setMessage(e.target.value);
            }}
            ref={input}
            /* onKeyPress={(e) => {
              e.key === "Enter" && SendMessage();
            }} */
          />
          <motion.div
            animate={
              sending
                ? {
                    rotateZ: 360,
                    transition: { repeat: Infinity, ease: "linear" },
                  }
                : { rotateZ: 0 }
            }
            className={`${sending && style.disabled}`}
          >         
            <div>
              <BsEmojiSmile onClick={()=>{Toggle()}}/>
              { toggle && (
                  <Picker
                    pickerStyle={{
                      position:"fixed",
                      bottom:"100px",
                      right:"36px",
                      boxShadow:"none",
                      height:"150px",
                      width:"240px",
                    }}
                    groupNames={{
                      smileys_people: '',
                      animals_nature: '',
                      food_drink: '',
                      travel_places: '',
                      activities: '',
                      objects: '',
                      symbols: '',
                      flags: '',
                    }} 
                    disableSearchBar={true} 
                    onEmojiClick={onEmojiClick} 
                  />
            )}
            </div>
            <IoSend onClick={SendMessage}></IoSend>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default PrivateChat;
