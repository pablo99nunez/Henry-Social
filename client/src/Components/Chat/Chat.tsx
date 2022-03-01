import React, { useEffect, useState } from "react";
import useUser from "../../Hooks/useUser";
import io from "socket.io-client";
import style from "./Chat.module.scss";
import { BiChevronsUp } from "react-icons/bi";

const socket= io("http://localhost:3001");

const Chat = () => {
  const user = useUser();
  const [open,setOpen] = useState(false);
  const [message,setMessage] = useState("");
  const [listMessage,setListMessage] = useState<any[]>([])
  const handleClick = (e:any) => {
    setOpen(prevState => (!prevState))
  }

  const SendMessage =  () => {
    if (message) {
      const messageData = {
          author:user?.username,
          message: message,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      socket.emit("send_message",messageData)
      setMessage("")
    }
  }
  useEffect(()=>{
      socket.on("receive_message", (data) => {
        setListMessage((listMessage)=>[...listMessage,data])
      })
  },[socket,listMessage])

  return (
    <>
      {!open ? 
      ( 
        <div onClick={e => handleClick(e)} className={style.chat}>
          Live Chat{" "}
          <span>
          {" "}
          <BiChevronsUp />
          </span>
        </div>
      )
      : (
      <div  className={style.chat_window}>
        <div onClick={e => handleClick(e)} className={style.chat_header}>
          <p>Live Chat</p>
        </div>
        <div className={style.chat_body}>        
          {listMessage.map((msg)=>(
            <div 
              className={style.message}
              id={user?.username === msg.author ? `${style.you}` :  `${style.other}`}
            >
              <div>
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
            onChange={(e)=>{
              setMessage(e.target.value)
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && SendMessage();
            }}
          />
          <button onClick={SendMessage}>&#9658;</button>
        </div>
      </div>
      )
    }
    </>
  );
};

export default Chat;
