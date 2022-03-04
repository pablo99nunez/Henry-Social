import { useState, FC } from "react";
import style from "./Post.module.scss";
import { IPost } from "../../../../src/models/Post";
import CommentModal from "../CommentModal/CommentModal";
import Interactions from "./Interactions/Interactions";
import Options from "./Options/Options";
import ProfileName from "./ProfileName/ProfileName";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Content from "./Content/Content";
import LoadingPage from "../LoadingPage/LoadingPage";
import Image from "./Image/Image";
import { PromiseProvider } from "mongoose";

type Props = {
  post: IPost;
  share: boolean;
  setShare: Function;
  contenedor: Function;
};

const Post: FC<Props> = ({ post, setShare, share, contenedor}) => {
  const [eliminated, setEliminated] = useState(false);

  const [openComment, setOpenComment] = useState(false);


  return (
    <div
      className={style.postContainer}
      style={{ display: eliminated ? "none" : "flex" }}
    >
      {!post?._id ? (
        <h2 style={{ textAlign: "center", color: "white" }}>
          Esta publicación ya ha sido eliminada.
        </h2>
      ) : post ? (
        <div
          className={`${style.post} ${
            post?.typePost === "empleo" && style.postJob
          } ${post?.typePost === "boom" && style.postBoom}
          ${post?.typePost === "pregunta" && style.postPregunta}`}
        >
          {post?.typePost !== "pregunta" && (
            <ProfilePicture post={post}></ProfilePicture>
          )}
          <div className={style.post_wrap}>
            {post?.typePost !== "pregunta" && (
              <ProfileName post={post}></ProfileName>
            )}
            <Content post={post}></Content>
            <Image post={post}></Image>
            <Options post={post} setEliminated={setEliminated}></Options>
            {(post.respuesta || post.typePost !== "pregunta") && (
              <Interactions
                post={post}
                setOpenComment={setOpenComment}
                openComment={openComment}
                openShare={share}
                setOpenShare={setShare}
                contenedor = {contenedor}
              ></Interactions>
            )}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
      <CommentModal open={openComment} postId={post?._id} />
    </div>
  );
};

export default Post