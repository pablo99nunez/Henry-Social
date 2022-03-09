import styles from "./Input.module.scss";

export default function Input(props: any) {
  return (
    <input
      className={`${styles.input} ${props.className} ${
        props.error ? styles.invalid : ""
      }`}
      {...props}
    ></input>
  );
}
