import React from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";
import tinycolor from "tinycolor2";

type Props = {
  children: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  style?: any;
  backgroundColor?: string;
  color?: string;
  name?: string;
  type?: any;
  value?: string;
  ref?: any;
  id?: string;
};

export default function Button({
  children,
  onClick,
  active,
  style,
  backgroundColor = "#ff1",
  color,
  name,
  type,
  ref,
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
  return (
    <motion.button
      id={id}
      ref={ref}
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
      name={name}
    >
      {children}
    </motion.button>
  );
}
