import React from "react";
import style from "./Post.module.scss";
import { BsThreeDots, BsHeartFill, BsChatSquareDots, BsShareFill} from "react-icons/bs";
const Post = ()=> {
    return (
        <div className={style.post}>
            <div className={style.post_profile}>
                <div className={style.post_profile_info}>
                    <div className={style.post_profile_img}></div>
                    <p>Sofia Praderio</p>
                    <p><span> 12 Feb. 2022</span></p>
                </div>
                <div className={style.post_options}>
                    <BsThreeDots/>
                </div>
            </div>
            <div className={style.post_content}>
                <p>
                    Claves para desarrollar y no morir en el intento:
                    🟢Persevera
                    🟢Ten paciencia
                    🟢Enfocate en resolver problemas más que en tecnologías puntuales.
                    🟢Itera cuantas veces sea necesario.
                    🟢Aprende a pedir ayuda
                    🟢Adaptate a los cambios
                </p>
            </div>
            <div className={style.post_interacciones}>
                <div className={style.post_like_comments}>
                    <div className={style.post_icon}>
                        <BsHeartFill/>
                        <span>45</span>
                    </div>
                    <div className={style.post_icon}>
                        <BsChatSquareDots/>
                        <span>70</span>
                    </div>
                </div>
                <div className={style.post_icon}>
                    <BsShareFill/>
                </div>
            </div>
        </div>
    )
}

export default Post;