import React, { useState, FC, useRef } from "react";
import { BsThreeDots, BsChatSquareDots } from "react-icons/bs";
import style from "./Post.module.scss";
import { Like } from "../Like/Like";
import { IPost } from "../../../../src/models/Post";
import { useNavigate } from "react-router";
import Avatar from "../Avatar/Avatar";
import CommentModal from "../CommentModal/CommentModal";

type Props = {
  post: IPost;
};

const Post: FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const postRef = useRef(null);
  const headerRef = useRef(null);
  const [openComment, setOpenComment] = useState(false);
  const contentRef = useRef(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.target);
    if (
      e.target === postRef.current ||
      e.target === contentRef.current ||
      e.target === headerRef.current
    ) {
      navigate("/post/" + post._id);
    }
  };

  return (
    <div className={style.postContainer}>
      <div
        className={`${style.post} ${
          post?.typePost === "boom"
            ? style.postBoom
            : post?.typePost === "empleo"
            ? style.postJob
            : style.post
        }`}
        onClick={handleClick}
        ref={postRef}
      >
        <div
          className={style.post_profile_img}
          onClick={() => {
            navigate("/profile/" + post?.author.username); //Proponer cambio de ubicacion del click
          }}
        >
          <Avatar
            avatar={
              typeof post?.author?.avatar === "string"
                ? post.author?.avatar
                : ""
            }
          ></Avatar>
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
            {typeof post?.companyImage === "string" && (
              <img src={post?.companyImage} alt="company" />
            )}
            <div className={style.post_options}>
              <BsThreeDots />
            </div>
          </div>
          {post?.typePost !== "normal" && (
            <div className={style.post_header}>
              {post?.typePost === "boom" ? (
                <h4 ref={headerRef}>
                  💥💥💥Contratad@ para {post?.company} como {post?.position}
                  💥💥💥
                </h4>
              ) : (
                post?.typePost === "empleo" && (
                  <>
                    <p>Busqueda laboral:</p>
                    <p>
                      {post?.company} esta buscando {post?.position}
                    </p>
                    {post?.body}
                    <p>{`Link: ${"link"}`}</p>
                    {post?.salary ? <p>Salario: {post?.salary}</p> : <p></p>}
                  </>
                )
              )}
            </div>
          )}
          <div className={style.post_content} ref={contentRef}>
            {post?.body}
          </div>
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
        </div>
      </div>
      <CommentModal open={openComment} postId={post?._id}></CommentModal>
    </div>
  );
};

export default Post;
