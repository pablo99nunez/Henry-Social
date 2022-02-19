import React from "react";
import styles from "./Input.module.scss";

export default function Input({ value, type, placeholder }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={styles.input}
    ></input>
  );
}
