import React from "react";
import style from "./Post.module.scss";
import {
  BsThreeDots,
  BsHeartFill,
  BsChatSquareDots,
  BsShareFill,
} from "react-icons/bs";
import Like from "../Like/Like";
const Post = () => {
  return (
    <div className={style.post}>
      <div className={style.post_profile_img}>
        <img
          src="https://assets.soyhenry.com/henry-landing/assets/peopleImages/sofi.jpg"
          alt=""
        />
      </div>
      <div className={style.post_wrap}>
        <div className={style.post_profile}>
          <h3>Sofia Pradeiro</h3>
          <h4>15 Feb. 2022</h4>
        </div>
        <div className={style.post_options}>
          <BsThreeDots />
        </div>
        <div className={style.post_content}>
          <p>
            Claves para desarrollar y no morir en el intento:
            <br /> *Persevera <br /> *Ten paciencia
            <br /> *Enfocate en resolver problemas más que en tecnologías
            puntuales.
            <br /> *Itera cuantas veces sea necesario.
            <br /> *Aprende a pedir ayuda <br />
            *Adaptate a los cambios
          </p>
        </div>
        <div className={style.post_interacciones}>
          <div className={style.post_like_comments}>
            <Like></Like>
            <div className={style.post_icon}>
              <BsChatSquareDots />
              <span>70</span>
            </div>
          </div>
          <div className={style.post_icon}>
            <BsShareFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
