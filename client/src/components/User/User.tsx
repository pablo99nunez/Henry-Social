import React, {useState, useEffect} from 'react';
import {useParams, Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { Example } from './example';
import FollowBar from '../followBar/FollowBar';
import Chat from '../Chat/Chat';
import Post from '../Post/Post';
import Settings from '../Settings/Settings';
import './User.scss';
import linkedin from '../../img/linkedin.png'
import github from '../../img/github.png'
import coffee from '../../img/coffee-cup.png'

export default function User() {
    const [follow, setFollow] = useState('');
    const [settings, setSettings] = useState(false);
    var { id } = useParams();
    var dispatch = useDispatch();
    let usuario: Example = {
        username: 'Miguel',
        photoUser: 'https://avatars.githubusercontent.com/u/86069194?v=4',
        userdata:'Cohorte 20B',
        numFollow: 20,
        numFollowers: 30,
        linkedin:'miguelcoronel93',
        github: 'miketr32',
        owner: true,
        admin:true
    }

    const editProfile = () => {
        return setSettings(true);
    }
    interface Estilos {
        background: string
    }

    function estilado() {
        let estilos: Estilos ={
            background: 'url(https://avatars.githubusercontent.com/u/86069194?v=4) center/contain no-repeat',

        }
        return estilos
    }
    const prueba = estilado();

    if(settings === false) {
    return(
        <div className='User'>
            <div className='ejemplo-navBar'> </div>
            <div className='head-profile'>
            <div className='header'> </div>
                <div className='head-profile-central'>
                    <div className='photo' style={prueba}>

                    </div>
                <div className='details'>
                    <div className='follows'>
                        <p>{usuario.numFollow} Siguiendo</p>
                        <p>{usuario.numFollowers}Seguidores</p>
                    </div>
                    <div className='userInfo'>
                        <p><strong>{usuario.username}</strong></p>
                        <p>{usuario.userdata}</p>
                    </div>
                    <div className='buttons'>
                        { 
                        usuario.owner && usuario.admin ? (
                        <div>
                        <button onClick={editProfile}>Edit-profile</button>
                        <button>Admin</button>
                        </div>
                        ) : 
                        usuario.owner ?
                        (
                            <button onClick={editProfile}>Edit-profile</button>
                        ) : 
                        !usuario.owner && usuario.admin ? (
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
                    <div className='social-logos'>
                        { usuario.linkedin.length !== 0 ? (
                            <a href={`https://www.linkedin.com/in/${usuario.linkedin}`}>
                                <div>
                                    <img src={linkedin} alt='linkedin-profile' className='linkedin-logo'/>
                                </div>
                            </a>): (
                                <div>
                                    <img src={linkedin} alt='linkedin-profile' className='linkedin-logo'/>
                                </div>
                            )
                        }
                        { usuario.github.length !== 0 ? (
                            <a href={`https://www.github.com/${usuario.github}`}>
                                <div>
                                    <img src={github} alt='github-logo'  className='github-logo'/>
                                </div>
                            </a> ) : (
                                <div>
                                    <img src={github} alt='github-logo'  className='github-logo'/>
                                </div>
                            )
                        }
                </div>
                </div>
                </div>
            </div>
            <div className='body-profile'>
            <div className='follow-bar'>
                <h4>Siguiendo</h4>
                <FollowBar />
                <a>Ver mas</a>
            </div>
            <div className='central-profile'> 
                    <Post />
            </div>
            <div className='mistery-box'>
                {'Misterious NavBar'}
            </div>
            </div>
            <Chat />
        </div>
    ) }
    else{
        return(
            <div>

                <Settings/>

                <div className='Userb'>
            <div className='ejemplo-navBar'> </div>
            <div className='head-profile'>
            <div className='header'> </div>
                <div className='head-profile-central'>
                    <div className='photo' style={prueba}>

                    </div>
                <div className='details'>
                    <div className='follows'>
                        <p>{usuario.numFollow} Siguiendo</p>
                        <p>{usuario.numFollowers}Seguidores</p>
                    </div>
                    <div className='userInfo'>
                        <p><strong>{usuario.username}</strong></p>
                        <p>{usuario.userdata}</p>
                    </div>
                    <div className='buttons'>
                        { 
                        usuario.owner && usuario.admin ? (
                        <div>
                        <button onClick={editProfile}>Edit-profile</button>
                        <button>Admin</button>
                        </div>
                        ) : 
                        usuario.owner ?
                        (
                            <button onClick={editProfile}>Edit-profile</button>
                        ) : 
                        !usuario.owner && usuario.admin ? (
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
                    <div className='social-logos'>
                        { usuario.linkedin.length !== 0 ? (
                            <a href={`https://www.linkedin.com/in/${usuario.linkedin}`}>
                                <div>
                                    <img src={linkedin} alt='linkedin-profile' className='linkedin-logo'/>
                                </div>
                            </a>): (
                                <div>
                                    <img src={linkedin} alt='linkedin-profile' className='linkedin-logo'/>
                                </div>
                            )
                        }
                        { usuario.github.length !== 0 ? (
                            <a href={`https://www.github.com/${usuario.github}`}>
                                <div>
                                    <img src={github} alt='github-logo'  className='github-logo'/>
                                </div>
                            </a> ) : (
                                <div>
                                    <img src={github} alt='github-logo'  className='github-logo'/>
                                </div>
                            )
                        }
                </div>
                </div>
                </div>
            </div>
            <div className='body-profile'>
            <div className='follow-bar'>
                <h4>Siguiendo</h4>
                <FollowBar />
                <a>Ver mas</a>
            </div>
            <div className='central-profile'> 
                    <Post />
            </div>
            <div className='mistery-box'>
                {'Misterious NavBar'}
            </div>
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