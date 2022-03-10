import axios from "axios";
import Post from "../Post";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { IPost } from "../../../../../src/models/Post";

type Props = {
  post: IPost;
};

const PostShare: FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const [postShare, setPostShare] = useState(null);

  useEffect(() => {
    axios.get(`/post/${post.company}`).then((post) => setPostShare(post.data));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <p
        style={{ paddingBottom: "15px" }}
        onClick={() => navigate("/post/" + post._id)}
      >
        {post.body}
      </p>
      {postShare && <Post post={postShare} shared={true} />}
    </div>
  );
};

export default PostShare;
