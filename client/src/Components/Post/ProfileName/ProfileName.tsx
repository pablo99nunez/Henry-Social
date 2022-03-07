import { useNavigate } from "react-router";
import { IPost } from "../../../../../src/models/Post";
import style from "./ProfileName.module.scss";

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
      <h4>{getMomento(post?.postTime)}</h4>
    </div>
  );
}
