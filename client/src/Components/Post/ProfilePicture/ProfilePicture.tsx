import style from "./ProfilePicture.module.scss";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../../../../src/models/Post";
import Avatar from "../../Avatar/Avatar";

type Props = {
    post: IPost;
};

export default function ProfilePicture({ post }: Props) {
    const navigate = useNavigate();

    return (
        <div
            className={style.post_profile_img}
            onClick={() => {
                navigate("/profile/" + post?.author.username); //Proponer cambio de ubicacion del click
            }}
        >
            <Avatar
                avatar={
                    typeof post?.author?.avatar === "string"
                        ? post.author?.avatar
                        : ""
                }
            ></Avatar>
        </div>
    );
}
