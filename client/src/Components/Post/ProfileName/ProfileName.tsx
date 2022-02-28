import { useNavigate } from "react-router";
import { IPost } from "../../../../../src/models/Post";
import style from "../Post.module.scss";

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
            <h4>{new Date(post?.postTime).toLocaleString()}</h4>
            {typeof post?.companyImage === "string" && (
                <img src={post?.companyImage} alt="company" />
            )}
        </div>
    );
}
