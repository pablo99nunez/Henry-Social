import React from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";
import tinycolor from "tinycolor2";

export default function Button({
  children,
  onClick,
  active,
  style,
  backgroundColor = "#ff1",
  color,
  type,
  value, 
  id
}: any) {
  color =
    color ?? tinycolor(backgroundColor).getBrightness() <= 128
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
  
  return (
    <motion.button
      id={id}
      type={type ? type : "submit"}
      value={value ? value : ""}
      variants={variants}
      initial="initial"
      animate={active ? "active" : "initial"}
      onClick={onClick}
      whileHover="active"
      whileTap={{
        scale: 1.07,
      }}
      transition={{
        duration: 0.3,
        type: "tween",
      }}
      style={style}
      className={styles.button}
    >
      {children}
    </motion.button>
  );
}
