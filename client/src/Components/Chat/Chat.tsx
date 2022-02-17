import React from "react";
import style from "./Chat.module.scss";
import { BiChevronsUp } from "react-icons/bi";
const Chat = () => {
    return (
        <div className={style.chat}>
            Live Chat <span> <BiChevronsUp/></span>
        </div>
    )
}

export default Chat;