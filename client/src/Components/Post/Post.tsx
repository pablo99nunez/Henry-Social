import React, { useState, FC , useRef } from 'react';
import {
    BsThreeDots,
    BsHeartFill,
    BsChatSquareDots,
    BsShareFill
} from 'react-icons/bs';
import style from "./Post.module.scss";
import { Like } from "../Like/Like";
import { IPost } from "../../../../src/models/Post";
import { useNavigate } from "react-router";
import Avatar from "../Avatar/Avatar";
import CommentModal from "../CommentModal/CommentModal";

type Props = {
    post: IPost;
}

const Post: FC<Props> = ({ post }) => {
    const navigate = useNavigate();
    const postRef = useRef(null);
    const [openComment, setOpenComment] = useState(false);
    const contentRef = useRef(null);
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === postRef.current || e.target === contentRef.current) {
            navigate("/post/" + post._id);
        }
    };

    return(
        <div 
        className={
            post?.typePost === 'boom' ? style.postBoom 
            : post?.typePost === 'empleo' ? style.postJob 
            : post?.typePost === 'pregunta' ? style.postQuestion
            : style.post
            } onClick={handleClick} ref={postRef}>
            <div
                className={style.post_profile_img}
                onClick={() => {
                    navigate("/profile/" + post?.author.username);
                }}
            >
                <img
                    src={
                        typeof post?.author?.avatar === "string"
                            ? post.author?.avatar
                            : "default"
                    }
                    alt="avatar"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className={style.post_wrap}>
                <div className={style.post_profile}>
                    <h3
                        onClick={() => {
                            navigate("/profile/" + post.author.username);
                        }}
                    >
                        {post?.author?.name}
                    </h3>
                    <h4>{new Date(post?.postTime).toLocaleString()}</h4>
                </div>
                <div>
                    { post?.companyImage ? (
                    <div>
                        <div className={style.post_options_container}>
                        <input type='image' src={post?.companyImage} className={style.post_company_image}/>
                        </div>
                        <div className={style.post_options}>
                        <BsThreeDots />
                        </div>
                    </div>
                    ) : 
                    (
                    <div className={style.post_options}>
                        <BsThreeDots />
                    </div>
                    )
                    }
                </div>
                { 
                post?.typePost === 'boom' ? ( 
                        <div 
                        className={style.post_content} 
                        ref={contentRef}>
                        <p>💥💥💥Contratad@ para <strong>{post?.company}</strong> como <strong>{post?.position}</strong>💥💥💥</p>
                        {post?.body}
                    </div>
                ) : post?.typePost === 'empleo' ? (
                    <div 
                    className={style.post_content} 
                    ref={contentRef}>
                        <p><strong>Busqueda laboral</strong></p>
                        <p>{post?.company} esta buscando {post?.position}!!!</p>
                        {post?.body}
                        <p>{`Link: ${'link'}`}</p>
                            {post?.salary ? (
                                <p>Salario: {post?.salary}</p>
                            ) : (
                                <p></p>
                            )}
                    </div>
                ) : post?.typePost === 'pregunta' && post?.question?.answered  === true? (
                    <div className={style.post_content} ref={contentRef}>
                        {post?.question?.question}
                        {post?.question?.answer}
                        <p>Respondida por </p>
                    </div>
                ):(
                    <div className={style.post_content} ref={contentRef}>
                        {post?.body}
                    </div>
                )
                }
                <div className={style.post_interacciones}>
                    <div className={style.post_like_comments}>
                        <Like post={post}></Like>
                        <div
                            className={style.post_icon}
                            onClick={() => setOpenComment(!openComment)}
                        >
                        <div className={style.post_icon}>
                            <BsChatSquareDots />
                            <span>{post?.numComments}</span>
                        </div>
                    </div>
                </div>
            </div>
            <CommentModal open={openComment} postId={post?._id}></CommentModal>
        </div>
        </div>
    )
}

export default Post;

