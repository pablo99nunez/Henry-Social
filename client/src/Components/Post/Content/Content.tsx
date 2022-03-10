import React from "react";
import PostShare from "./PostShare";
import { useDispatch } from "react-redux";
import style from "./Content.module.scss";
import { useNavigate } from "react-router-dom";
import PostPregunta from "../Types/PostPregunta";
import { IPost } from "../../../../../src/models/Post";
import { filterByTag, setActiveSection } from "../../../redux/actions/actions";

type Props = {
  post: IPost;
};

export default function Content({ post }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setFilterTag = (e: any) => {
    dispatch(filterByTag(e.target.textContent));
    dispatch(setActiveSection(""));
  };
  const handleClick = (e: any) => {
    console.log(e);
    if (e.target.innerText[0] === "#") {
      navigate("/");
      setFilterTag(e);
    } else navigate("/post/" + post._id);
  };
  const renderType = () => {
    switch (post?.typePost) {
      case "boom": {
        return (
          <div className={style.contentBoom}>
            {typeof post?.companyImage === "string" && post?.companyImage && (
              <img src={post?.companyImage} alt="company" />
            )}
            <h4>
              💥💥💥Contratad@ para {post?.company} como {post?.position} 💥💥💥
            </h4>
            <div style={{ fontSize: "15px" }}>{post.body}</div>
          </div>
        );
      }
      case "empleo": {
        return (
          <div className={style.postEmpleo}>
            {typeof post?.companyImage === "string" && post?.companyImage && (
              <img src={post?.companyImage} alt="company" />
            )}
            <h3>
              <strong>{post?.company}</strong> esta buscando{" "}
              <strong>{post?.position}</strong>
            </h3>
            <br></br>
            <div style={{ fontSize: "14px" }}>{post?.body}</div>
            <br></br>
            <div className={style.linkEmpleo}>
              {post?.companyLink && (
                <a href={post?.companyLink}>
                  <strong style={{ color: "#1a5fc7" }}>
                    Link de la oferta
                  </strong>{" "}
                  📌
                </a>
              )}
              {post?.salary && (
                <p>
                  {" "}
                  <strong style={{ color: "#1a5fc7" }}>Salario:</strong>{" "}
                  {post?.salary} {post?.salaryCoin}
                </p>
              )}
            </div>
          </div>
        );
      }
      case "share": {
        return <PostShare post={post} />;
      }
      case "pregunta": {
        return <PostPregunta post={post} />;
      }
      default: {
        return (
          <p>
            {post.body.split(" ").map((e) => (
              <span
                className={`${style.spanBody} ${e[0] === "#" && style.hashtag}`}
                onClick={handleClick}
              >
                {e}
              </span>
            ))}
          </p>
        );
      }
    }
  };

  return (
    <div onClick={() => navigate("/post/" + post._id)}>{renderType()}</div>
  );
}
