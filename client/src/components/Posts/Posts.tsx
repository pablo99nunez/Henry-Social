import React from 'react';
import { PostModel } from '../../interface';

import Post from '../Post/Post';

const postsMock : PostModel[] = [
	{
		id: "1",
		username: "Sofia Praderio",
		photoUser: "https://cdn.domestika.org/c_fill,dpr_1.0,f_auto,h_1200,pg_1,t_base_params,w_1200/v1589759117/project-covers/000/721/921/721921-original.png?1589759117",
		date: "hace 30 minutos",
		countLikes: 20,
		countComments: 44,
		type: "service",
		content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit expedita eos voluptatibus? Labore ullam minima beatae velit voluptas nemo dolorem, vel facilis provident itaque harum incidunt quo tenetur maiores fugit.",
		images: "https://i.blogs.es/a54755/foto-perfil-google-1/1366_2000.jpg"
	},
		{
		id: "3",
		username: "Sofia Praderio",
		photoUser: "https://cdn.domestika.org/c_fill,dpr_1.0,f_auto,h_1200,pg_1,t_base_params,w_1200/v1589759117/project-covers/000/721/921/721921-original.png?1589759117",
		date: "hace 30 minutos",
		countLikes: 20,
		countComments: 44,
		type: "default",
		content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit expedita eos voluptatibus? Labore ullam minima beatae velit voluptas nemo dolorem, vel facilis provident itaque harum incidunt quo tenetur maiores fugit.",
		images: "https://i.blogs.es/a54755/foto-perfil-google-1/1366_2000.jpg"
	},
		{
		id: "3",
		username: "Sofia Praderio",
		photoUser: "https://cdn.domestika.org/c_fill,dpr_1.0,f_auto,h_1200,pg_1,t_base_params,w_1200/v1589759117/project-covers/000/721/921/721921-original.png?1589759117",
		date: "hace 30 minutos",
		countLikes: 20,
		countComments: 44,
		type: "boom",
		content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit expedita eos voluptatibus? Labore ullam minima beatae velit voluptas nemo dolorem, vel facilis provident itaque harum incidunt quo tenetur maiores fugit.",
		images: "https://i.blogs.es/a54755/foto-perfil-google-1/1366_2000.jpg"
	}
]


const Posts = () => {
	return (
		<div>

			{
				postsMock.map((el, index) => (
					<Post 
						key={index}
						id={el.id}
						username={el.username}
						photoUser={el.photoUser}
						date={el.date}
						countLikes={el.countLikes}
						countComments={el.countComments}
						type={el.type}
						content={el.content}
						images={el.images} />
				))
			}
		</div>
	)
}

export default Posts;