import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FollowBar from '../../Components/FollowBar/FollowBar';
import Chat from '../../Components/Chat/Chat';
import Post from '../../Components/Post/Post';
import style from './User.module.scss';
import linkedin from '../../assets/icons/linkedin2.png';
import github from '../../assets/icons/github2.png';
import coffee from '../../assets/icons/coffee-cup3.png';
import { IUser } from '../../../../src/models/User';
import NavSearch from '../../Components/NavSearch/NavSearch';
import Button from '../../Components/Button/Button';
import Settings from '../../Components/Settings/Settings';
import useUser from '../../Hooks/useUser'

export default function User() {
  const [edit, setEdit] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [follow, setFollow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();
  

  var { username } = useParams();
  let userLogeado = useUser()

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
    setLoading(false);
  }
  useEffect(() => {
    getUser();
    if(username===userLogeado?.username) setisOwner(true)
  }, []);
  const editProfile = () => {
    return setEdit(true);
  };

  return (
    <>
      <NavSearch></NavSearch>
      {<Settings open={edit}></Settings>}
      <div className={style.User}>
        <div className={style.head_profile}>
          <div className={style.head_profile_central}>
            <div className={style.photo}>
           
              <img src={
                typeof user?.avatar =="string" ?
                  user?.avatar: "https://s5.postimg.cc/537jajaxj/default.png"
                } alt="" />
            </div>
            <div className={style.details}>
              <div className={style.buttons}>
                {userLogeado?.admin ? user?.admin ? <Button>Eliminar rol de Admin</Button> : <Button>Hacer Admin</Button> : null}
                {isOwner ? (
                  <Button onClick={editProfile}>Editar Perfil</Button>
                ) : (
                  <div className={style.buttons}>
                    <Button>
                      Invitame un cafe
                      <img src={coffee} alt="coffee-logo" />
                    </Button>
                    <Button
                      onClick={() => {
                        setFollow(!follow);
                      }}
                      active={follow}
                    >
                      {follow ? 'Siguiendo' : 'Seguir'}
                    </Button>
                  </div>
                )}
              </div>
              <div className={style.userInfo}>
                <h1>{user?.name}</h1>
                <h2>{user?.cohorte} FT20b</h2>
                <div className={style.bio}>
                  <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, aperiam.</h3>
                </div>
              </div>

              <div className={style.details_bottom}>
                <div>
                  <div>
                    <h3>{user?.following}</h3>
                    <h3>Seguidos</h3>
                  </div>
                  <div>
                    <h3>{user?.followers}</h3>
                    <h3>Seguidores</h3>
                  </div>
                </div>

                <div>
                  {user?.linkedin ? (
                    <a href={`https://www.linkedin.com/in/${user.linkedin}`}>
                      <div>
                        <img src={linkedin} alt="linkedin-profile" className={style.linkedin_logo} />
                      </div>
                    </a>
                  ) : (
                    <div>
                      <img src={linkedin} alt="linkedin-profile" className={style.linkedin_logo} />
                    </div>
                  )}
                  {user?.github ? (
                    <a href={`https://www.github.com/${user.github}`}>
                      <div>
                        <img src={github} alt="github-logo" className={style.github_logo} />
                      </div>
                    </a>
                  ) : (
                    <div>
                      <img src={github} alt="github-logo" className={style.github_logo} />
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>
        <div className={style.body_profile}>
          <div className={style.follow_bar}>
            <FollowBar />
          </div>
          <div className={style.posts}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <div className={style.mistery_box}>{'Misterious NavBar'}</div>
        </div>
        <Chat />
      </div>
      </div>

    </>
  );
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