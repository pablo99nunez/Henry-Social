import React, {useState} from "react";
import { BsChatSquareDots,BsTrophy } from "react-icons/bs";
import { IoArrowRedoOutline, IoArrowRedoSharp } from "react-icons/io5";
import { IPost } from "../../../../../src/models/Post";
import { Like } from "../../Like/Like";
import { SharePost } from "../../SharePosts/SharePost"
import style from "../Post.module.scss";

type Props = {
    post: IPost;
    setOpenComment: Function;
    openComment: boolean;
    openShare: boolean;
    setOpenShare: Function;
    contenedor:Function;
};

export default function Interactions({
    post,
    setOpenComment,
    openComment,
    openShare,
    setOpenShare,
    contenedor
}: Props) {
    return (
        <div className={style.post_interacciones}>
            <div className={style.post_like_comments}>
                <Like post={post}></Like>
                <div
                    className={style.post_icon}
                    onClick={() => setOpenComment(!openComment)}
                >
                    <div className={style.post_icon}>
                        <BsChatSquareDots />
                        <span>{post?.numComments}</span>
                    </div>

                </div>
                <div 
                className={style.post_icon}
                onClick={() => {setOpenShare(!openShare); contenedor(post);}}
                >
                <IoArrowRedoOutline />
                <span>{post?.nShares}</span>
                </div>
                <div className={style.post_icon}>
                    <BsTrophy/>
                </div>
            </div>
        </div>
    );
}
