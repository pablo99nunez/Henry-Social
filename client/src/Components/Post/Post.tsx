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
import { SharePost } from "../SharePosts/SharePost";
import { PromiseProvider } from "mongoose";
// import useUser from "../../Hooks/useUser";

type Props = {
  post: IPost;
  shared: boolean;
};

const Post: FC<Props> = ({ post, shared = false}) => {
  const [openShare, setOpenShare] = useState(false);
  const [eliminated, setEliminated] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  return (
    <div
      className={style.postContainer}
      style={{ display: eliminated ? "none" : "flex" , zIndex: shared ? '80' : '50'}}
    >
      {!post?._id ? (
        <h2 style={{ textAlign: "center", color: "white" }}>
          Esta publicación ya ha sido eliminada.
        </h2>
      ) : post ? (
        <div
          className={`${style.post} 
            ${post?.typePost === "empleo" && style.postJob} 
            ${post?.typePost === "boom" && style.postBoom}
            ${post?.typePost === "pregunta" && style.postPregunta}
            ${shared && style.shared}
          `}
        >
          {post?.typePost !== "pregunta" && (
            <ProfilePicture post={post}/>
          )}
          <div className={style.post_wrap}>
            {post?.typePost !== "pregunta" && (
              <ProfileName post={post}/>
            )}
            <Content post={post}/>
            <Image post={post}/>
            <Options 
              post={post} 
              shared={shared} 
              setEliminated={setEliminated}
            />
            {(post.respuesta || post.typePost !== "pregunta") && (
              <Interactions
                post={post}
                shared={shared}
                openComment={openComment}
                setOpenComment={setOpenComment}
                openShare={openShare}
                setOpenShare={setOpenShare}
              />
            )}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
      <SharePost                 
        post={post}
        openShare={openShare}
        setOpenShare={setOpenShare}
      />
      <CommentModal open={openComment} postId={post?._id} />
    </div>
  );
};

export default Post