import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ObjectFlags } from "typescript";
import Avatar from "../Avatar/Avatar";
import Placeholder from "./Placeholder";
import styles from "./Seguido.module.scss";

const Seguido = ({ username, key }: any) => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .post("/findUser", { username })
      .then((data) => {
        return setUser(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return user ? (
    <Link to={`/profile/${user?.username}`} className={styles.user} key={key}>
      <p>{user?.name}</p>
      <Avatar avatar={user?.avatar}></Avatar>
    </Link>
  ) : (
    <Placeholder />
  );
};

export default Seguido;
