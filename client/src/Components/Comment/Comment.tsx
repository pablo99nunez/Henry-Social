import "./Comment.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment, FaEllipsisH, FaBan, FaRegFrown, FaHeart } from "react-icons/fa";

const Comment = ({ key, data }: any) => {
  const [options, setOptions] = useState(false);
  const [liked, setLiked] = useState(false)
  
  return (
    <div className="comment" key={key}>
      <div className="picture">
        <img className="photo" src={data.author.avatar} alt={"avatar"} />
      </div>

      <div className="info">
        <div className="author">
          <Link className="name" to={`/profile/${data.postId}`}>
            {data.author.name}
          </Link>
          <span className="cohorteDate">
            · {new Date(data.postTime).toLocaleString()}
          </span>
        </div>

        <div className="content">
          <p className="desc">{data.text}</p>
        </div>

        <div className="likesComments">
          <div className="sizeLikes" onClick={() => setLiked(!liked)}>
            {liked ? <FaHeart/> : <FaRegHeart/>}
            <p className="count">{data.countLikes || 0 + (liked ? 1 : 0)}</p>
          </div>
          <div className="sizeComments" title="Comentarios">
            <FaRegComment />
            <p className="count">{data.countComments || 0}</p>
          </div>
        </div>
      </div>

      <div className="options">
        <FaEllipsisH
          title="Más"
          className="icon"
          onClick={() => setOptions(true)}
        />
        <div
          className={`menu ${options ? "view" : "hide"}`}
          onMouseOver={() => (document.onclick = null)}
          onMouseOut={() =>
            (document.onclick = () => {
              setOptions(false);
              return (document.onclick = null);
            })
          }
        >
          <p className="item">
            <FaRegFrown />
            Este comentario no es útil.
          </p>
          <p className="item">
            <FaBan />
            Bloquear usuario
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
