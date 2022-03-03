import axios from "axios";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../../../../src/models/Post";
import useUser from "../../../Hooks/useUser";
import { InfoAlert } from "../../Alert/Alert";
import style from "../Post.module.scss";
type Props = {
  post: IPost;
  setEliminated: Function;
};

export default function Options({ post, setEliminated }: Props) {
  const userLogeado = useUser();
  const [demand, setDemand] = useState(false);
  const [options, setOptions] = useState(false);

  const navigate = useNavigate();

  const handleDemand = () => {
    const username = userLogeado?.username;
    if (!demand)
      axios
        .post(`/report`, {
          _id: post._id,
          username,
        })
        .then((data) => {
          InfoAlert.fire({
            title: `El usuario ${post.author.name} fue denunciado.`,
            icon: "success",
          });
          return data;
        })
        .catch((error) => console.error("Error:", error));
    setDemand(true);
  };

  const handleDelete = async () => {
    const redirect = location.href.includes("post");
    await axios
      .delete(`/post`, {
        data: { _id: post._id },
      })
      .then((data) => {
        InfoAlert.fire({
          title: redirect
            ? "Fuiste redirigido a Home."
            : "Tu publicación fue eliminada.",
          icon: "success",
        });
        return data;
      })
      .catch((error) => console.error("Error:", error));
    setEliminated(true);
    if (redirect) {
      navigate("/");
    }
  };
  return !demand ? (
    <div className={style.post_options}>
      <BsThreeDots onClick={() => setOptions(!options)} />
      <div
        className={`${style.post_optionsList} ${
          options ? style.view : style.hide
        }`}
      >
        {userLogeado?.username === post?.author?.username ? (
          <p className={style.item} onClick={handleDelete}>
            <FaBan />
            Eliminar publicación.
          </p>
        ) : (
          <p className={style.item} onClick={handleDemand}>
            <FaBan />
            Denunciar publicación.
          </p>
        )}
      </div>
    </div>
  ) : null;
}
