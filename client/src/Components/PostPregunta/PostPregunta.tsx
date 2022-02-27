import axios from "axios";
import { useRef, useState } from "react";
import { BsChatSquareDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router";
import { IPost } from "../../../../src/models/Post";
import useUser from "../../Hooks/useUser";
import CommentModal from "../CommentModal/CommentModal";
import { Like } from "../Like/Like";

import style from "./PostPregunta.module.scss";

type Props = {
    post: IPost;
};

export default function PostPregunta({ post }: Props) {
    const [openComment, setOpenComment] = useState(false);
    const user = useUser();
    const [response, setResponse] = useState("");
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const handleResponse = async () => {
        try {
            if (user) {
                await axios.put("/answer", {
                    idPost: post._id,
                    response,
                    respuestaAuthor: user,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className={style.post}>
                <div className={style.post_wrap}>
                    <div className={style.post_profile}>
                        <h2>{post?.pregunta}</h2>
                        <h4>{new Date(post.postTime).toLocaleString()}</h4>
                    </div>
                    <div className={style.post_content} ref={contentRef}>
                        {post?.body}
                        {post?.respuesta ? (
                            <>
                                <h3>Respuesta:</h3>
                                <h4>{post.respuesta}</h4>
                                <h4
                                    onClick={() =>
                                        navigate(
                                            "/profile/" +
                                                post.respuestaAuthor?.username
                                        )
                                    }
                                    className={style.responseAuthor}
                                >
                                    Resuelto por:{" "}
                                    <strong>
                                        {post.respuestaAuthor?.name}
                                    </strong>
                                </h4>
                                <div className={style.post_interacciones}>
                                    <div className={style.post_like_comments}>
                                        <Like post={post}></Like>
                                        <div
                                            className={style.post_icon}
                                            onClick={() =>
                                                setOpenComment(!openComment)
                                            }
                                        >
                                            <div className={style.post_icon}>
                                                <BsChatSquareDots />
                                                <span>{post?.numComments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={style.responseForm}>
                                <textarea
                                    placeholder="Tu respuesta"
                                    value={response}
                                    onChange={(e) =>
                                        setResponse(e.target.value)
                                    }
                                />
                                <IoSend onClick={handleResponse}></IoSend>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CommentModal open={openComment} postId={post?._id}></CommentModal>
        </>
    );
}
