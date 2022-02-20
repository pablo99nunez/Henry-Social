import "./Comment.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Like } from "../Like/Like";
import { FaRegComment, FaEllipsisH, FaBan, FaRegFrown } from "react-icons/fa";

const Comment = ({ key, data, post }: any) => {
    const [options, setOptions] = useState(false);

    return (
        <div className="comment" key={key}>
            <div className="picture">
                <img className="photo" src={data.img} alt={data.author} />
            </div>

            <div className="info">
                <div className="author">
                    <Link className="name" to={`/profile/${data.postId}`}>
                        {data.author}
                    </Link>
                    <span className="cohorteDate">
                        {data.cohorte} · {data.postTime}
                    </span>
                </div>

                <div className="content">
                    <p className="desc">{data.text}</p>
                </div>

                <div className="likesComments">
                    <div className="sizeLikes">
                        <Like post={post} />
                        {/* {data.countLikes &&
              <p className='count'>{data.countLikes}</p>
            } */}
                    </div>
                    {/* Al presionar en el icono o el numero de comentarios llevaria a tipo un posteo
              con el comentario y sus comentarios */}
                    {/* <Link to={${data.author}/posts${data.postId}} className="sizeComments"> */}
                    <div className="sizeComments" title="Comentarios">
                        <FaRegComment />
                        {data.countComments && (
                            <p className="count">{data.countComments}</p>
                        )}
                    </div>
                </div>
                {/* </Link> */}
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
