import { useNavigate } from "react-router";
import { IPost } from "../../../../../src/models/Post";
import style from "./ProfileName.module.scss";
import TA from "../../../assets/icons/TA.png";
import Instructor from "../../../assets/icons/Instructor.jpg";

import { getMomento } from "../../../helpers/momento";

type Props = {
  post: IPost;
};

export default function ProfileName({ post }: Props) {
  const navigate = useNavigate();
  return (
    <div className={style.post_profile}>
      <h3
        onClick={() => {
          navigate("/profile/" + post.author.username);
        }}
      >
        {post?.author?.name}
      </h3>

      {post.author.role !== "Estudiante" && (
        <div className={style.role}>
          {post.author.role == "TA" && <img src={TA} alt="TA" title="TA"></img>}
          {post.author.role == "Instructor" && (
            <img src={Instructor} alt="Instructor" title="Instructor"></img>
          )}
        </div>
      )}
      <h4>{getMomento(post?.postTime)}</h4>
    </div>
  );
}
