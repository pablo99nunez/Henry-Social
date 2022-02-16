import React from 'react';
import { PostModel } from '../../interface';
import style from './Post.module.scss';

import commentLogo from '../../assets/comment-logo.png';
import shareLogo from '../../assets/share-logo.png';
import likeLogo from '../../assets/like-logo.png';


const Post : React.FC<PostModel> = ({ id, username, photoUser, date, countLikes, countComments, type, content, images}) => {
	return (
		<div className={`${style.postContainer} ${type === "service" && style.borderBlue} ${type === "boom" && style.borderRed}`}>
			<div className={style.contentLeft}>
				<img src={photoUser} alt="" />
				<div className={style.contentPost}>
					<div className={style.infoUser}>
						<h4>{username}</h4>
						<p>{date}</p>
					</div>
					<div className={style.contenidoContainer}>
						<div>
							<p>{content}</p>
							<img src={images} alt="" />
							{
								type === 'service' && <button>Agendar una cita</button>
							}
						</div>
					</div>
					<div className={style.iconsContainer}>
						<div>
							<img src={likeLogo} alt="" />
							<p>{countLikes}</p>
						</div>
						<div>
							<img src={commentLogo} alt="" />
							<p>{countComments}</p>
						</div>
					</div>
				</div>
			</div>
			<div className={style.contentRight}>
				<img src={commentLogo} alt="" />
				<img src={shareLogo} alt="" />
			</div>
		</div>
	)
}

export default Post;