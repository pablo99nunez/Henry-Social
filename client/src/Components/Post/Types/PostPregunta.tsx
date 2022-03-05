import axios from "axios";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router";
import { IPost } from "../../../../../src/models/Post";
import useUser from "../../../Hooks/useUser";
import { InfoAlert } from "../../Alert/Alert";
import { getMomento } from "../../../helpers/momento";

import style from "../Post.module.scss";

type Props = {
  post: IPost;
};

export default function PostPregunta({ post }: Props) {
  const user = useUser();
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleResponse = async () => {
    try {
      if (user) {
        await axios.put("/answer", {
          idPost: post._id,
          response,
          respuestaAuthor: user,
        });
        InfoAlert.fire({
          title: "Tu respuesta ha sido enviada",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      InfoAlert.fire({
        title: "Hubo un problema con tu respuesta",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className={style.post_profile}>
        <h2>{post?.pregunta}</h2>
        <h4>{getMomento(post?.postTime)}</h4>
      </div>
      <div className={style.post_content} /*  ref={contentRef} */>
        {post?.body}
        {post?.respuesta ? (
          <>
            <h3>Respuesta:</h3>
            <h4>{post.respuesta}</h4>
            <h4
              onClick={() =>
                navigate("/profile/" + post.respuestaAuthor?.username)
              }
              className={style.responseAuthor}
            >
              Resuelto por: <strong>{post.respuestaAuthor?.name}</strong>
            </h4>
          </>
        ) : (
          <div className={style.responseForm}>
            <textarea
              placeholder="Tu respuesta"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <IoSend onClick={handleResponse}></IoSend>
          </div>
        )}
      </div>
    </>
  );
}
