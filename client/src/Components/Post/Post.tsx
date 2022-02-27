import React, { useState, FC, useRef, useEffect } from "react";
import { FaBan } from "react-icons/fa";
import { BsThreeDots, BsChatSquareDots } from "react-icons/bs";
import style from "./Post.module.scss";
import { Like } from "../Like/Like";
import { IPost } from "../../../../src/models/Post";
import { useNavigate } from "react-router";
import Avatar from "../Avatar/Avatar";
import CommentModal from "../CommentModal/CommentModal";
import axios from "axios";
import { InfoAlert } from "../Alert/Alert";
import LoadingPage from "../LoadingPage/LoadingPage";
import useUser from "../../Hooks/useUser";

type Props = {
  post: IPost;
};

const Post: FC<Props> = ({ post }) => {
  const userLogeado = useUser();
  const navigate = useNavigate();
  const postRef = useRef(null);
  const headerRef = useRef(null);
  const [demand, setDemand] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [options, setOptions] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const contentRef = useRef(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // console.log(e.target);
    if (
      e.target === postRef.current ||
      e.target === contentRef.current ||
      e.target === headerRef.current
    ) {
      navigate("/post/" + post._id);
    }
  };

  const handleDemand = () => {
    const username = userLogeado?.username
    if(!demand)
    axios
      .post(`/report`, {
        _id: post._id,
        username
      })
      .then((data) => {
        InfoAlert.fire({
          title: `El usuario ${post.author.name} fue denunciado.`,
          icon: "success",
        });
        return data;
      })
      .catch((error) => console.error("Error:", error));
    setDemand(true)
  }

  const handleDelete = async () => {
    const redirect = location.href.includes('post')
    await axios
      .delete(`/post`, {
        data: {_id: post._id}
      })
      .then((data) => {
        InfoAlert.fire({
          title: redirect ? 'Fuiste redirigido a Home.' : 'Tu publicación fue eliminada.',
          icon: "success",
        });
        return data;
      })
      .catch((error) => console.error("Error:", error));
    setEliminated(true)
    if(redirect){ navigate("/")}
  }

  useEffect(() => {
    console.log(post?._id);
  }, [post])
  

  return (
    <div 
      className={style.postContainer}
      style={{display: eliminated ? 'none' : 'block'}}
    >
      {post?._id === false ? 
      <h2 style={{textAlign: 'center', color: 'white'}}>Esta publicación ya ha sido eliminada.</h2>
      : post ?
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
            {!demand &&
              <div className={style.post_options}>
                <BsThreeDots
                  onClick={() => setOptions(!options)}
                />
                <div 
                  className={`${style.post_optionsList} ${options ? style.view : style.hide}`}
                >
                  {userLogeado?.username === 
                  post?.author?.username 
                  ? (
                  <p
                    className={style.item}
                    onClick={handleDelete}
                  >
                    <FaBan/>
                    Eliminar publicación.
                  </p>
                  ) : (
                  <p 
                    className={style.item}
                    onClick={handleDemand}
                  >
                    <FaBan/>
                    Denunciar publicación.
                  </p>
                  )}
                </div>
              </div>
            }
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
      : <LoadingPage/>
      }
      <CommentModal open={openComment} postId={post?._id}></CommentModal>
    </div>
  );
};

export default Post;
