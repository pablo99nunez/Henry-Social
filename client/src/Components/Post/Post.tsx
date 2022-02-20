import React, { useState, FC, useRef } from "react";
import style from "./Post.module.scss";
import {
    BsThreeDots,
    BsHeartFill,
    BsChatSquareDots,
    BsShareFill,
} from "react-icons/bs";
import { Like } from "../Like/Like";
import { IPost } from "../../../../src/models/Post";
import { useNavigate } from "react-router";

type Props = {
    post: IPost;
};

const Post: FC<Props> = ({ post }) => {
    const navigate = useNavigate();
    const postRef = useRef(null);
    const contentRef = useRef(null);
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === postRef.current || e) {
            navigate("/post/" + post._id);
        }
    };

    return (
        <div className={style.post} onClick={handleClick} ref={postRef}>
            <div
                className={style.post_profile_img}
                onClick={() => {
                    navigate("/profile/" + post?.author.username);
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
                    <h4>{post?.postTime}</h4>
                </div>
                <div className={style.post_options}>
                    <BsThreeDots />
                </div>
                <div className={style.post_content} ref={contentRef}>
                    {post?.body}
                </div>
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
    );
};
export default Post;
