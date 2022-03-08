import style from "./Content.module.scss";
import { useNavigate } from "react-router-dom";
import PostPregunta from "../Types/PostPregunta";
import { IPost } from "../../../../../src/models/Post";
import PostShare from './PostShare';
type Props = {
  post: IPost;
};

export default function Content({ post }: Props) {
  const navigate = useNavigate();

  const renderType = () => {
    switch (post?.typePost) {
      case "boom": {
        return (
          <div className={style.contentBoom}>
            {typeof post?.companyImage === "string" && (
              <img src={post?.companyImage} alt="company" />
            )}
              <h4 /* ref={headerRef} */>
                💥💥💥Contratad@ para {post?.company} como {post?.position} 
                💥💥💥
              </h4>
              <div style={{fontSize:"15px"}}>
              {post.body}
              </div>
          </div>
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
      case "share": {
        return <PostShare post={post} />;
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
        post.typePost !== 'share' && navigate("/post/" + post._id);
      }}
    >
      {renderType()}
    </div>
  );
}
