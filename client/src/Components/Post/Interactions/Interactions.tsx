import React from "react";
import { BsChatSquareDots } from "react-icons/bs";
import { IPost } from "../../../../../src/models/Post";
import { Like } from "../../Like/Like";
import style from "../Post.module.scss";

type Props = {
  post: IPost;
  setOpenComment: Function;
  openComment: boolean;
};

export default function Interactions({
  post,
  setOpenComment,
  openComment,
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
      </div>
    </div>
  );
}
