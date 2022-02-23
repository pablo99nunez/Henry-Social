import React, { useState } from "react";
import CSS from "csstype";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import "./LoginInput.module.scss";

interface InputProps {
  id: string,
  title?: string,
  type: string,
  name: string,
  valid?: boolean
  placeholder?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
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
  onChange
}: InputProps): JSX.Element{

  const [visibility, setVisibility] = useState(false);

  const ps = type === "password";

  const toggleVisibility = (): void => {
    setVisibility(!visibility);
  }

  return (
    <div id="input-cont">
      <label
        htmlFor={id} 
        title={title} 
        style={{
          display: valid === undefined ? "none"
          : valid  ? "none" : "block"
        }}
        > <FiAlertCircle/> </label>
        {
          <span id="eye"
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
        type={
          type === "password" && visibility ? "text"
          : type
        }
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}