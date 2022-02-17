import './Comment.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Comment = ({data} : any) => {

  const [ liked, setLiked ] = useState(false)
  const [ options, setOptions ] = useState(false)

  return (
    <div className="comment">

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
          <div className="sizeLikes" onClick={() => setLiked(!liked)}>
            <i title='Likes' className={`${liked ? 'fas' : 'far'} fa-heart icon`}/>
            {data.countLikes &&
              <p className='count'>{data.countLikes}</p>
            }
          </div>
          <div className="sizeComments">
            <i title='Comentarios' className={`far fa-comment${data.countComments > 1 ? 's' : ''} icon`}/>
            {data.countComments &&
              <p className='count'>{data.countComments}</p>
            }
            </div>
        </div>
      </div>
          
      <div className="options">
        <i title='Más' className='fas fa-ellipsis-h icon' onClick={() => setOptions(true)}/>
        <div 
          className={`menu ${options ? 'view' : 'hide'}`}
          onMouseOver= {() => document.onclick = null}
          onMouseOut={() => document.onclick = () => {
            setOptions(false)
            return document.onclick = null
          }} 
        >
          <p className='item'><i className='fas fa-frown'/>Este comentario no es útil.</p>
          <p className='item'><i className='fas fa-ban'/>Bloquear usuario</p>
        </div>
      </div>
    </div>  
  )
}

export default Comment