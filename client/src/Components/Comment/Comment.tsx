import "./Comment.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Like } from "../Like/Like";
import { FaEllipsisH, FaBan, FaRegFrown, FaTrash } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { getMomento } from "../../helpers/momento";
import axios from "axios";
import useUser from "../../Hooks/useUser";
import { InfoAlert } from "../Alert/Alert";

const Comment = ({ key, data }: any) => {
  const user = useUser()
  const [remove, setRemove] = useState(false);
  const [options, setOptions] = useState(false);

  const handleDelete= () => {
    axios
      .delete(`/comment`, {
        data: { postId: data?.postId },
      })
      .then((data) => {
        InfoAlert.fire({
          title: "Comentario eliminado.",
          icon: "success",
        });
        setRemove(true)
        return data;
      })
      .catch((error) => console.error("Error:", error));
  }
  return remove ? <></> :(
    <div className="comment" key={key}>
      <div className="picture">
        <Avatar avatar={data.author.avatar} />
      </div>

      <div className="info">
        <div className="author">
          <Link className="name" to={`/profile/${data.postId}`}>
            {data.author.name}
          </Link>
          <span className="cohorteDate">· {getMomento(data?.postTime)}</span>
        </div>

        <div className="content">
          <p className="desc">{data.text}</p>
        </div>

        <div className="likesComments">
          <div className="sizeLikes">
            <Like post={data} />
          </div>
          {/* <div className="sizeComments" title="Comentarios">
            <FaRegComment />
            <p className="count">{data.countComments || 0}</p>
          </div> */}
        </div>
      </div>

      <div className="options">
        <FaEllipsisH
          title="Más"
          className="icon"
          onClick={() => setOptions(true)}
        />
        {user?.username === data?.author?.username &&
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
              <p className='item' onClick={handleDelete}>
                <FaTrash />
                Eliminar comentario.
              </p>
            {/* <p className="item">
              <FaRegFrown />
              Este comentario no es útil.
            </p>
            <p className="item">
              <FaBan />
              Bloquear usuario
            </p> */}
          </div>
        }
      </div>
    </div>
  );
};

export default Comment;
