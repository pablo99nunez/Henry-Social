import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Example } from './example';
import FollowBar from '../../components/followBar/FollowBar';
import Chat from '../../components/Chat/Chat';
import Post from '../../components/Post/Post';
import Settings from '../../components/Settings/Settings';
import './User.scss';
import linkedin from '../../img/linkedin.png';
import github from '../../img/github.png';
import coffee from '../../img/coffee-cup.png';
import { IUser } from '../../../../src/models/User';

export default function User() {
  const [edit, setEdit] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [follow, setFollow] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();
  var dispatch = useDispatch();
  var { username } = useParams();
  let usuario: IUser = {
    name: 'Miguel',
    email: 'miguel@asdfsc.com',
    username: 'Miguel52',
    avatar: 'https://avatars.githubusercontent.com/u/86069194?v=4',
    cohorte: '20B',
    following: 20,
    followers: 30,
    linkedin: 'miguelcoronel93',
    github: 'miketr32',
    admin: true
  };
  async function getUser() {
    setLoading(true);
    let user = await fetch('http://localhost:3001/findUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    }).then((res) => res.json());
    if (user === null) return alert('No existe el usuario');
    setUser(user);
    console.log(user);
    setLoading(false);
  }
  useEffect(() => {
    getUser();
    if (user?.username === username) setisOwner(true);
  }, []);
  const editProfile = () => {
    return setEdit(true);
  };

  if(edit === false){
  return (
    <div className="Userb">
      <div className="ejemplo-navBar"> </div>
      <div className="head-profile">
        <div className="header"> </div>
        <div className="head-profile-central">
          <div className="photo">
            <img src={user?.avatar} alt="" />
          </div>
          <div className="details">
            <div className="follows">
              <p>{user?.following} Siguiendo</p>
              <p>{user?.followers}Seguidores</p>
            </div>
            <div className="userInfo">
              <p>
                <strong>{user?.name}</strong>
              </p>
              <p>{user?.cohorte}</p>
            </div>
            <div className="buttons">
            { 
              isOwner && user?.admin ? (
              <div>
              <button onClick={editProfile}>Edit-profile</button>
              <button>Admin</button>
              </div>
              ) : 
              isOwner ?
              (
                  <button onClick={editProfile}>Edit-profile</button>
              ) : 
              !isOwner && user?.admin ? (
                  <div className='buttons'>
                  <button>Invitame un cafe<img src={coffee} alt='coffee-logo' className='coffee'/></button>
                  <button>{'follow'}</button>
                  <button>Admin</button>
                  </div>
              ):
              (
                  <div className='buttons'>
                  <button>Invitame un cafe<img src={coffee} alt='coffee-logo' className='coffee'/></button>
                  <button>{'follow'}</button>
                  </div>
              )
              }
            </div>
            <div className="social-logos">
              {user?.linkedin ? (
                <a href={`https://www.linkedin.com/in/${usuario.linkedin}`}>
                  <div>
                    <img src={linkedin} alt="linkedin-profile" className="linkedin-logo" />
                  </div>
                </a>
              ) : (
                <div>
                  <img src={linkedin} alt="linkedin-profile" className="linkedin-logo" />
                </div>
              )}
              {user?.github ? (
                <a href={`https://www.github.com/${usuario.github}`}>
                  <div>
                    <img src={github} alt="github-logo" className="github-logo" />
                  </div>
                </a>
              ) : (
                <div>
                  <img src={github} alt="github-logo" className="github-logo" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="body-profile">
        <div className="follow-bar">
          <h4>Siguiendo</h4>
          <FollowBar />
          <a>Ver mas</a>
        </div>
        <div className="central-profile">
          <Post />
        </div>
        <div className="mistery-box">{'Misterious NavBar'}</div>
      </div>
      <Chat />
    </div>
  );
    }
    else{
      return(
        <div>
          <Settings />
        <div className="User">
      <div className="ejemplo-navBar"> </div>
      <div className="head-profile">
        <div className="header"> </div>
        <div className="head-profile-central">
          <div className="photo">
            <img src={user?.avatar} alt="" />
          </div>
          <div className="details">
            <div className="follows">
              <p>{user?.following} Siguiendo</p>
              <p>{user?.followers}Seguidores</p>
            </div>
            <div className="userInfo">
              <p>
                <strong>{user?.name}</strong>
              </p>
              <p>{user?.cohorte}</p>
            </div>
            <div className="buttons">
            { 
              isOwner && user?.admin ? (
              <div>
              <button onClick={editProfile}>Edit-profile</button>
              <button>Admin</button>
              </div>
              ) : 
              isOwner ?
              (
                  <button onClick={editProfile}>Edit-profile</button>
              ) : 
              !isOwner && user?.admin ? (
                  <div className='buttons'>
                  <button>Invitame un cafe<img src={coffee} alt='coffee-logo' className='coffee'/></button>
                  <button>{'follow'}</button>
                  <button>Admin</button>
                  </div>
              ):
              (
                  <div className='buttons'>
                  <button>Invitame un cafe<img src={coffee} alt='coffee-logo' className='coffee'/></button>
                  <button>{'follow'}</button>
                  </div>
              )
              }
            </div>
            <div className="social-logos">
              {user?.linkedin ? (
                <a href={`https://www.linkedin.com/in/${usuario.linkedin}`}>
                  <div>
                    <img src={linkedin} alt="linkedin-profile" className="linkedin-logo" />
                  </div>
                </a>
              ) : (
                <div>
                  <img src={linkedin} alt="linkedin-profile" className="linkedin-logo" />
                </div>
              )}
              {user?.github ? (
                <a href={`https://www.github.com/${usuario.github}`}>
                  <div>
                    <img src={github} alt="github-logo" className="github-logo" />
                  </div>
                </a>
              ) : (
                <div>
                  <img src={github} alt="github-logo" className="github-logo" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="body-profile">
        <div className="follow-bar">
          <h4>Siguiendo</h4>
          <FollowBar />
          <a>Ver mas</a>
        </div>
        <div className="central-profile">
          <Post />
        </div>
        <div className="mistery-box">{'Misterious NavBar'}</div>
      </div>
      <Chat />
    </div>
    </div>
      )
    }
}

/* 
Datos que tengo que recibir en este componente: ===> Crear unos componentes de ejemplo

- Si el usuario logueado es el propietario de este perfil o no

- Nombre, numero de cohorte, foto, email 

- Num de seguidores/seguidos 

- Link de Linkedin y Github

- Arreglo con los usuarios a los que sigue

- Arreglo con las publicaciones hechas ==> Ver si tratar esto en un componente aparte o no


*/
