import './PostDetail.scss'
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPostDetail } from '../../redux/actions'
import Comments from '../../components/Comments/Comments';
// import { useDispatch , useSelector } from 'react-redux';

export default function PostDetail() {

  // const { id } = useParams()
  // const dispatch = useDispatch()
  // const details = useSelector(state => state.postDetail)

  // useEffect(() => {
  //   dispatch(getPostDetail(id))
  // }, [])

  return (
    <div id='postDetail'>
      {/* El navbar, follow-bar, post, messages serán reemplazados por sus debidos componentes*/}
      
      <nav id='navbar'></nav>

      <div id="content">
        <div id="follow-bar"></div>
        {/* <FollowBar/>  */}

        <div id="boxPost">
          <div id="post"></div>
          {/* <Post
                name={details.name}
                likes={details.likes}
                content={details.content}
                imgProfile={details.imgProfile}
                countComments={details.countComments}
              /> 
          */}
          <Comments 
            // comments={details.comments}
          />
        </div>

        <div id="messages"></div>
        {/* <Messages/> */}
      </div>
    </div>
  )
}

/* 

Datos que tengo que recibir en este componente:

-Los detalles del Post:

  Nombre, fecha de publicacion, contenido del post, 
  numero de likes y comentarios, 
  arreglo de objetos con cada uno de los comentarios:
  { name, content, date, cohorte(opc), countLikes} 

*/