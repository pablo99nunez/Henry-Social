import './Comments.scss'
import Comment from '../Comment/Comment'

// Recibe comments por props
// export default function Comments({comments} : any) { 
export default function Comments() { 

  // comentarios de prueba
  const comments = [
    {
      id: 1,
      name: 'Luis Alonso',
      img: 'https://www.elimparcial.com/img/2021/01/01/2020-12-30_12-59-07.jpg',
      cohorte: '20b',
      date: '20h',
      content: 'Muy buena explicacion, me gusto mucho la forma en que explicaste el desarrollo de una página web.',
      countLikes: 23,
      countComments: 10,
    },
    {
      id: 2,
      name: 'Pedro Castro',
      img: 'https://www.elimparcial.com/img/2021/01/01/2020-12-30_12-59-07.jpg',
      cohorte: '19b',
      date: '20h',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, dolores. Harum odio ad ullam soluta doloremque expedita nisi, fugiat aut, adipisci facilis similique enim? Sed labore provident laboriosam fuga. Neque dolores dolore quo expedita, deserunt possimus voluptatem cumque fugiat perferendis!.',
      countLikes: 32,
      countComments: 5,
    },
    {
      id: 3,
      name: 'Jose Rueda',
      img: 'https://www.elimparcial.com/img/2021/01/01/2020-12-30_12-59-07.jpg',
      cohorte: '13b',
      date: '20h',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint soluta omnis beatae veritatis nulla reprehenderit aperiam. Accusamus voluptatem eaque quis veniam expedita nulla laboriosam quam. Expedita ea numquam veniam ducimus?.',
      countLikes: 23,
      countComments: 10,
    },
    {
      id: 4,
      name: 'Pablo Nuñez',
      img: 'https://www.elimparcial.com/img/2021/01/01/2020-12-30_12-59-07.jpg',
      cohorte: '21a',
      date: '20h',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, exercitationem.',
      countLikes: 23,
      countComments: 10,
    }
  ]

  return (
    <div className='comments'>
      {comments.map((p,i) => 
        <Comment key={i} data={p}/>
      )}
    </div>
  )
}