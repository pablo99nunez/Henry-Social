import React, { useState, FC , useRef } from 'react';
import {
    BsThreeDots,
    BsHeartFill,
    BsChatSquareDots,
    BsShareFill
} from 'react-icons/bs';
import style from "./Post.module.scss";
import { Like } from "../Like/Like";
import { IPost } from "../../../../src/models/Post";
import { useNavigate } from "react-router";
import Avatar from "../Avatar/Avatar";

type Props = {
    post: IPost;
}

const Post: FC<Props> = ({ post }) => {
    const navigate = useNavigate();
    const postRef = useRef(null);
    const contentRef = useRef(null);
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === postRef.current || e.target === contentRef.current) {
            navigate("/post/" + post._id);
        }
    };

    return(
<div className={post?.typePost === 'boom' ? style.post : post?.typePost === 'empleo' ? style.post : style.post} onClick={handleClick} ref={postRef}>
            <div
                className={style.post_profile_img}
                onClick={() => {
                    navigate("/profile/" + post?.author.username);  //Proponer cambio de ubicacion del click
                }}
            >
                <img
                    src={
                        typeof post?.author?.avatar === "string"
                            ? post.author?.avatar
                            : "default"
                    }
                    alt="avatar"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className={style.post_wrap}>
                <div className={style.post_profile}>
                    <h3
                        onClick={() => {
                            navigate("/profile/" + post.author.username);
                        }}
                    >
                        {post?.author?.name}
                    </h3>
                    <h4>{new Date(post?.postTime).toLocaleString()}</h4>
                </div>
                <div>
                    { post?.companyImage ? (
                    <div className={style.post_options}>
                        {post?.companyImage}
                        <BsThreeDots />
                    </div>
                    ) : 
                    (
                    <div className={style.post_options}>
                        <BsThreeDots />
                    </div>
                    )
                    }
                </div>
                { 
                post?.typePost === 'boom' ? ( 
                        <div className={style.post_content} ref={contentRef}>
                        <p>💥💥💥Contratad@ para {post?.company} como {post?.position}💥💥💥</p>
                        {post?.body}
                    </div>
                ) : post?.typePost === 'empleo' ? (
                    <div className={style.post_content} ref={contentRef}>
                        <p>Busqueda laboral:</p>
                        <p>{post?.company} esta buscando {post?.position}</p>
                        {post?.body}
                        <div>
                            <p>Link: {post?.companyLink}</p>
                            {post?.salary ? (
                                <p>Salario: {post?.salary}</p>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={style.post_content} ref={contentRef}>
                        {post?.body}
                    </div>
                )
                }
                <div className={style.post_interacciones}>
                    <div className={style.post_like_comments}>
                        <Like post={post}></Like>
                        <div className={style.post_icon}>
                            <BsChatSquareDots />
                            <span>{post?.numComments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;