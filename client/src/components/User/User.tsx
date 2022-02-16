import React, {useState, useEffect} from 'react';
import {useParams, Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import './User.css';

export default function User() {
    var { id } = useParams();
    var dispatch = useDispatch();

    return(
        <div className='User'>
            <div className='ejemplo-navBar'> </div>
            <div className='head-profile'>
            <div className='header'> </div>
                <div className='head-profile-central'>
                    <div className='photo'>
                        <img className='user-photo' />
                    </div>
                <div className='details'>
                    <div className='follows'>
                        <p>{/*num-follow */} Siguiendo</p>
                        <p>{/*num-followers*/}Seguidores</p>
                    </div>
                    <div className='userInfo'>
                        <p><strong>{'User name'}</strong></p>
                        <p>{'student-details'}</p>
                    </div>
                    <div className='buttons'>
                        <button>{'coffee'}</button>
                        <button>{'edit-profile'}</button> {/*O follow */}
                    </div>
                </div>
                {/*Aca irian los botones a los perfiles de Linkedin y Github*/}
                </div>
            </div>
            <div className='body-profile'>
            <div className='follow-bar'>
                <h4>Siguiendo</h4>
                {/*Aca entraria el array con los seguidos */}
                <a>Ver mas</a>
            </div>
            <div className='central-profile'> 
                {/*Aca irian los posteos realizados por el usuario:
                    Creo que podrian recibirse de dos formas:
                    1- Un componente ya renderizado
                    2- Renderizar cada uno de los datos recibidos ===> Arreglo de objetos
                */} 
            </div>
            <div className='mistery-box'>
                {'Misterious NavBar'}
            </div>
            </div>
            {/*Aca iria el chat */}
        </div>
    )
}

/* 
Datos que tengo que recibir en este componente:

- Si el usuario logueado es el propietario de este perfil o no

- Nombre, numero de cohorte, foto, email 

- Num de seguidores/seguidos 

- Link de Linkedin y Github

- Arreglo con los usuarios a los que sigue

- Arreglo con las publicaciones hechas ==> Ver si tratar esto en un componente aparte o no


*/