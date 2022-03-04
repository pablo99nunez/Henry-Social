import React, { useState } from "react";
import CSS from "csstype";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import style from "./LoginInput.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface InputProps {
  id: string,
  title?: string,
  type: string,
  name: string,
  valid?: boolean,
  placeholder?: string,
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void,
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void,
  onKeyUp?(e: React.KeyboardEvent<HTMLInputElement>): void,
  onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): void,
}

const eyeStyles: CSS.Properties = {
  position: "absolute",
  right: "0"
}

export default function LoginInput({ 
  id,
  title,
  type,
  name,
  valid,
  placeholder,
  onChange,
  onKeyUp,
  onKeyDown,
  onBlur
}: InputProps): JSX.Element{

  const [visibility, setVisibility] = useState(false);

  const ps = type === "password";

  const toggleVisibility = (): void => {
    setVisibility(!visibility);
  }

  return (
    <div className={style.input_cont}>
      <label
        htmlFor={id}  
        style={{
          display: valid === undefined ? "none"
          : valid  ? "none" : "block"
        }}
        > <FiAlertCircle/> </label>
      {valid ? <></> : <div id={style.err_msg}><ErrorMessage e={title}/></div>}
        {
          <span id={style.eye}
            style={{
            display: ps ? "block" : "none"
          }}>
            {
            visibility ? <FiEye style={eyeStyles} onClick={toggleVisibility}/>
            : <FiEyeOff style={eyeStyles} onClick={toggleVisibility}/> 
            }
          </span>
        }
      <input
        id={id}
        title={title}
        type={
          type === "password" && visibility ? "text"
          : type
        }
        name={name}
        placeholder={placeholder}
        onChange={onChange && onChange}
        onKeyUp={onKeyUp && onKeyUp}
        onKeyDown={onKeyDown && onKeyDown}
        onBlur={onBlur &&  onBlur}
      />
    </div>
  )
}
