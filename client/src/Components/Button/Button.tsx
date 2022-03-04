import React, { ButtonHTMLAttributes, useRef } from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";
import tinycolor from "tinycolor2";

type Props = {
  children: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  style?: any;
  backgroundColor?: string;
  color?: string;
  name?: string;
  type?: any;
  value?: string;
  disabled?: boolean;
  title?: string;
  id?: string;
  ref?: any;
};

export default function Button({
  children,
  onClick,
  onSubmit,
  active,
  ref,
  style,
  title,
  disabled,
  backgroundColor = "#ff1",
  color,
  name,
  type,
  value,
  id,
}: Props) {
  color = color
    ? color
    : tinycolor(backgroundColor).getBrightness() <= 128
    ? "#ff1"
    : "#000";
  const variants = {
    initial: {
      scale: 1,
      backgroundColor,
      color,
    },
    active: {
      backgroundColor: color,
      color: backgroundColor,
      scale: 1.07,
    },
  };
  const button = useRef(ref);
  return (
    <motion.button
      id={id}
      disabled={disabled}
      title={title}
      type={type ? type : "submit"}
      value={value ? value : ""}
      variants={variants}
      initial="initial"
      animate={active ? "active" : "initial"}
      onClick={onClick}
      onSubmit={onSubmit}
      whileHover={!disabled ? "active" : ""}
      ref={button}
      whileTap={{
        scale: 1.07,
      }}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      style={style}
      className={`${styles.button} ${disabled && styles.disabled}`}
      name={name}
    >
      {children}
    </motion.button>
  );
}
