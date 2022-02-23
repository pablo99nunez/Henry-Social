import React from "react";
import { IUser } from "../../../../src/models/User";
type Props = {
  user: IUser;
};
import styles from "./Avatar.module.scss";

export default function Avatar({ user }: Props) {
  return (
    <img
      src={
        typeof user.avatar === "string"
          ? user.avatar
          : "https://s5.postimg.cc/537jajaxj/default.png"
      }
      className={styles.avatar}
    ></img>
  );
}
