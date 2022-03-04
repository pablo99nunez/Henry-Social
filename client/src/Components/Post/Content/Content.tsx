import { useNavigate } from "react-router-dom";
import { IPost } from "../../../../../src/models/Post";
import PostPregunta from "../Types/PostPregunta";
import style from "./Content.module.scss";
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
            <h4 style={{textAlign:"center"}}/* ref={headerRef} */>
              💥💥💥Contratad@ para {post?.company} como {post?.position} 
              💥💥💥
            </h4>
            <br></br>
            <div>
            {post.body}
            </div>
          </>
        );
      }
      case "empleo": {
        return (
          <>
            <p style={{fontSize:"20px"}}>Busqueda laboral:</p>
            <p>
              {post?.company} esta buscando {post?.position}
            </p>
            <br></br>
            <div style={{fontSize:"14px"}}>
            {post?.body}
            </div>
            <br></br>
            <div className={style.linkEmpleo}>
            <a href={post?.companyLink}><strong style={{color:"#1a5fc7"}}>Link de la oferta</strong> 📌</a>
            {post?.salary ? <p> <strong style={{color:"#1a5fc7"}}>Salario:</strong> {post?.salary}</p> : <p></p>}
            </div>
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
