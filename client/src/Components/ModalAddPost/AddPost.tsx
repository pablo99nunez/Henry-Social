import axios from "axios";
import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../Hooks/useUser";
import { getPosts } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import styles from "./AddPost.module.scss";

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
};

const AddPost: FC<Props> = ({ setOpen }) => {
  const [textarea, setTextarea] = useState("");
  const [buttons, setButtons] = useState({ fotoVideo: "", tag: "" });
  const dispatch = useDispatch();
  const user = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(buttons.tag);
    if (e.target.textContent === "Foto/Video") {
      setButtons({
        ...buttons,
        fotoVideo: e.target.textContent,
      });
    } else {
      setButtons({
        ...buttons,
        tag: e.target.textContent,
      });
    }
  };

  const handleSubmit = () => {
    console.log(buttons.tag);
    if (user)
      axios
        .post(`/post`, {
          body: textarea,
          author: user._id,
          typePost: buttons.tag,
        })
        .then((data) => {
          InfoAlert.fire("Publicado");
          setOpen(false);
          dispatch(getPosts());
          return data;
        })
        .catch((error) => console.error("Error:", error));
  };
  return (
    <div className={styles.modal_add_post}>
      <div className={styles.add_post_textarea}>
        <textarea
          name="textarea"
          cols={30}
          rows={50}
          onChange={(e) => handleChange(e)}
        ></textarea>
      </div>
      <div className={styles.add_post_tags}>
        <button onClick={(e) => handleClick(e)}>Foto/Video</button>
        <button onClick={(e) => handleClick(e)}>Boom</button>
        <button onClick={(e) => handleClick(e)}>Ofertas de empleo</button>
        <button onClick={(e) => handleClick(e)}>Servicio</button>
        <button onClick={(e) => handleClick(e)}>Pregunta</button>
      </div>
      <div className={styles.add_post_buttons}>
        <button onClick={() => handleSubmit()}>Publicar</button>
        <button onClick={() => setOpen(false)}>Cancelar</button>
      </div>
    </div>
  );
};

export default AddPost;
