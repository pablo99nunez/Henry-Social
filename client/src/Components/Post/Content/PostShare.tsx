import axios from "axios"
import Post from "../Post";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react"
import { IPost } from "../../../../../src/models/Post";

type Props = {
    post: IPost;
  };
  
const PostShare: FC<Props> = ({ post }) => {
    const navigate = useNavigate()
    const [postShare, setPostShare] = useState(null)

    useEffect(()  => {
        axios
          .get(`/post/${post.company}`)
          .then(post => setPostShare(post.data))
    }, [])
    
  return (
    <div style={{width: '100%'}}>
      <p 
        onClick={ () => navigate("/post/" + post._id) }
        style={{marginBottom: '15px'}}
      >{post.body}</p>
      {postShare && <Post post={postShare} setEdit={null} setShowModal={null} shared={true}/>}
    </div>
  )
}

export default PostShare