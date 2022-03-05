import React, {useState} from "react";
import { BsChatSquareDots,BsTrophy } from "react-icons/bs";

import { IoArrowRedoOutline, IoArrowRedoSharp } from "react-icons/io5";
import { IPost } from "../../../../../src/models/Post";
import { Like } from "../../Like/Like";
import { SharePost } from "../../SharePosts/SharePost";
import style from "./Interactions.module.scss";

type Props = {
  post: IPost;
  setOpenComment: Function;
  openComment: boolean;
  openShare: boolean;
  setOpenShare: Function;
  shared: boolean;
};

export default function Interactions({
  post,
  setOpenComment,
  openComment,
  openShare,
  setOpenShare,
  shared,
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
        <div
          onClick={() => {
            setOpenShare(!openShare);
          }}
        >
          <IoArrowRedoOutline />
          <span>{post?.nShares}</span>
        </div>
      </div>
    </div>
  );
}
