import './Comment.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart, FaRegComments, FaEllipsisH, FaBan, FaRegFrown, FaHeart } from 'react-icons/fa'

const Comment = ({key, data} : any) => {

  const [ comment, setComment ] = useState(
    {
      liked: false,
      options: false
    }
  )

  return (
    <div className="comment" key={key}>

      <div className="picture">
        <img className='photo' src={data.img} alt={data.name}/>
      </div>

      <div className="info">

        <div className="author">
          <Link className='name' to={`/profile/${data.id}`}>{data.name}</Link>
          <span className='cohorteDate'>{data.cohorte} · {data.date}</span>
        </div>

        <div className="content">
          <p className='desc'>{data.content}</p>
        </div>

        <div className="likesComments">
          <div className="sizeLikes" onClick={() => setComment({...comment, liked: !comment.liked})}>
            {comment.liked 
              ? <FaHeart title='Likes' className='fas icon'/>
              : <FaRegHeart title='Likes' className='icon'/>
            }
            {data.countLikes &&
              <p className='count'>{data.countLikes}</p>
            }
          </div>
          {/* Al presionar en el icono o el numero de comentarios llevaria a tipo un posteo
              con el comentario y sus comentarios */}
          {/* <Link to={${data.name}/posts${data.id}} className="sizeComments"> */}
          <div className="sizeComments">
            <FaRegComments title='Comentarios' className={`far icon`}/>
            {data.countComments &&
              <p className='count'>{data.countComments}</p>
            }
            </div>
        </div>
        {/* </Link> */}
      </div>
          
      <div className="options">
        <FaEllipsisH title='Más' className='fas fa-ellipsis-h icon' onClick={() => setComment({...comment, options: true})}/>
        <div 
          className={`menu ${comment.options ? 'view' : 'hide'}`}
          onMouseOver= {() => document.onclick = null}
          onMouseOut={() => document.onclick = () => {
            setComment({...comment, options:false})
            return document.onclick = null
          }} 
        >
          <p className='item'>
            <FaRegFrown className='fas fa-frown'/>
            Este comentario no es útil.
          </p>
          <p className='item'>
            <FaBan className='fas fa-ban'/>Bloquear usuario
          </p>
        </div>
      </div>
    </div>  
  )
}

export default Comment