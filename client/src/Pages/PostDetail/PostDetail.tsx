import "./PostDetail.scss";
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPostDetail } from '../../redux/actions'
import Comments from "../../Components/Comments/Comments";
import { getPost } from "../../redux/actions/actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import FollowBar from "../../Components/followBar/FollowBar";
import Post from "../../Components/Post/Post";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideMessages from "../../Components/SideMessages/SideMessages";
// import { useDispatch , useSelector } from 'react-redux';

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state: IState) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id]);

  return (
    <>
      <NavSearch></NavSearch>
      <div id="postDetail">
        {/* El navbar, follow-bar, post, messages serán reemplazados por sus debidos componentes*/}

        <nav id="navbar"></nav>

        <div id="content">
          <div id="follow-bar">
            <FollowBar />
          </div>

          <div id="boxPost">
            <div id="post">
              <Post post={details} />
              <Comments
              // comments={details.comments}
              />
            </div>
          </div>

          <div id="messages">
            <SideMessages />
          </div>
        </div>
      </div>
    </>
  );
}

/* 

Datos que tengo que recibir en este componente:

-Los detalles del Post:

  Nombre, fecha de publicacion, contenido del post, 
  numero de likes y comentarios, 
  arreglo de objetos con cada uno de los comentarios:
  { name, content, date, cohorte(opc), countLikes} 

*/
