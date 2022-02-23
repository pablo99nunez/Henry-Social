import React from "react";
import { IUser } from "../../../../src/models/User";
type Props = {
  avatar: string;
};
import styles from "./Avatar.module.scss";

export default function Avatar({ avatar }: Props) {
  return (
    <img
      src={avatar || "https://s5.postimg.cc/537jajaxj/default.png"}
      className={styles.avatar}
    ></img>
  );
}
