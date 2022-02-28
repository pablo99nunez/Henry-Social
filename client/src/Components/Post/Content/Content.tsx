import { useNavigate } from "react-router-dom";
import { IPost } from "../../../../../src/models/Post";
import PostPregunta from "../Types/PostPregunta";
type Props = {
    post: IPost;
};

export default function Content({ post }: Props) {
    const navigate = useNavigate();

    const renderType = () => {
        switch (post?.typePost) {
            case "boom": {
                return (
                    <>
                        <h4 /* ref={headerRef} */>
                            💥💥💥Contratad@ para {post?.company} como{" "}
                            {post?.position}
                            💥💥💥
                        </h4>
                        {post.body}
                    </>
                );
            }
            case "empleo": {
                return (
                    <>
                        <p>Busqueda laboral:</p>
                        <p>
                            {post?.company} esta buscando {post?.position}
                        </p>
                        {post?.body}
                        <p>{`Link: ${"link"}`}</p>
                        {post?.salary ? (
                            <p>Salario: {post?.salary}</p>
                        ) : (
                            <p></p>
                        )}
                        {post.body}
                    </>
                );
            }
            case "pregunta": {
                return <PostPregunta post={post} />;
            }
            default: {
                return post.body;
            }
        }
    };

    return (
        <div
            onClick={() => {
                navigate("/post/" + post._id);
            }}
        >
            {renderType()}
        </div>
    );
}
