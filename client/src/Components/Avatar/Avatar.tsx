type Props = {
  avatar: string | undefined | null | File;
};
import styles from "./Avatar.module.scss";

export default function Avatar({ avatar }: Props) {
  return (
    <img
      src={
        (typeof avatar === "string" && avatar) ||
        "https://s5.postimg.cc/537jajaxj/default.png"
      }
      className={styles.avatar}
      referrerPolicy={"no-referrer"}
    ></img>
  );
}
