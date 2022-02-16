import React, {useState, useEffect} from 'react';
import {useParams, Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import './User.css';

export default function User() {
    var { id } = useParams();
    var dispatch = useDispatch();

    return(
        <div>
            <h1>Hola </h1>
            {/*Aca iria la NavBar */}
            <div className='head-profile'>
                <div className='head-profile-central'>
                    <img className='user-photo' />
                    <p>{'User name'}</p>
                    <p>{'student-details'}</p>
                </div>
                <p>{'num-follow'} Siguiendo</p>
                <p>{'num-followers'}Seguidores</p>
                <button>{'coffee'}</button>
                <button>{'edit-profile'}</button>
                {'Aca irian los botones a los perfiles de Linkedin y Github'}
            </div>
            <div className='follow-bar'>
                <h4>Siguendo</h4>
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
            <div>
                {'Misterious NavBar'}
            </div>
            {/*Aca iria el chat */}
        </div>
    )
}