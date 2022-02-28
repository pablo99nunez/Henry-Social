import { useState, FC } from "react";
import style from "./Post.module.scss";
import { IPost } from "../../../../src/models/Post";
import CommentModal from "../CommentModal/CommentModal";
import Interactions from "./Interactions/Interactions";
import Options from "./Options/Options";
import ProfileName from "./ProfileName/ProfileName";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Content from "./Content/Content";

type Props = {
    post: IPost;
};

const Post: FC<Props> = ({ post }) => {
  const [eliminated, setEliminated] = useState(false);

  const [openComment, setOpenComment] = useState(false);


  return (
    <div
      className={style.postContainer}
      style={{ display: eliminated ? "none" : "block" }}>
      { post?._id === false ? 
        <h2 style={{textAlign: 'center', color: 'white'}}>Esta publicación ya ha sido eliminada.</h2>
        : post ?
        <div
          className={`${style.post} ${
              post?.typePost === "empleo" && style.postJob
          } ${post?.typePost === "boom" && style.postBoom}
          ${post?.typePost === "pregunta" && style.postPregunta}`}>

          {post?.typePost !== "pregunta" && (
              <ProfilePicture post={post}></ProfilePicture>
          )}
          <div className={style.post_wrap}>
              {post?.typePost !== "pregunta" && (
                  <ProfileName post={post}></ProfileName>
              )}
              <Content post={post}></Content>
              <Options
                  post={post}
                  setEliminated={setEliminated}
              ></Options>
              {(post.respuesta || post.typePost !== "pregunta") && (
                  <Interactions
                      post={post}
                      setOpenComment={setOpenComment}
                      openComment={openComment}
                  ></Interactions>
              )}
          </div>
        </div>
      : <LoadingPage/>
      }
      <CommentModal open={openComment} postId={post?._id}/>
    </div>
  );
};

export default Post;
