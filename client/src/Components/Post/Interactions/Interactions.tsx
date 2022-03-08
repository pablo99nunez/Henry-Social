import React, { useState } from "react";
import { BsChatSquareDots, BsTrophy } from "react-icons/bs";

import { IoArrowRedoOutline, IoArrowRedoSharp } from "react-icons/io5";
import { IPost } from "../../../../../src/models/Post";
import { Like } from "../../Like/Like";
import style from "./Interactions.module.scss";

type Props = {
  post: IPost;
  setOpenComment: React.Dispatch<React.SetStateAction<boolean>>;
  openComment: boolean;
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
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
     <div>
    <div 
      style={{display: shared ? 'none' : 'flex'}}
      className={style.post_interacciones}
      >
      <div className={style.post_like_comments}>
         <Like post={post}></Like>

         <div
            className={style.post_icon}
            onClick={() => {
            setOpenComment(!openComment)
            openShare && setOpenShare(!openShare)
            }}
         >
            <div className={style.post_icon}>
               <BsChatSquareDots />
               <span>{post?.numComments}</span>
            </div>
         </div>

         <div 
            onClick={() => {
            setOpenShare(!openShare)
            openComment && setOpenComment(!openComment)
            }}
         >
            <IoArrowRedoOutline />
            <span>{post?.nShares}</span>
         </div>
      </div>
      </div>
    </div>
  );
}
