import React from "react";
import './Settings.scss'

export default function Settings({}) {

    return(
        <div className="central-settings">
            <form>
                <div className="header-settings">
                    <p>Edita tu perfil</p>
                    <div className="settings-photo"></div>
                </div>
                <p className="name">{'Nombre del usuario'}</p>
                    <hr className="hr"></hr>
                <div className="body-settings">
                    <textarea placeholder=" Escribe sobre ti..." className="text-area"></textarea>
                    <div className="option-buttons">
                        <button>Estudiante</button>
                    <button>Instructor</button>
                        <button>TA</button>
                    </div>
                </div>
                <div className="footer-settings">
                    <input type='text' placeholder="Ingresa tu Github" className="input" name='github'></input>
                    <input type='text' placeholder="Ingresa tu Linkedin" className="input" name='linkedin'></input>
                    <input type='text' placeholder="Ingresa tu portafolio" className="input" name='portfolio'></input>
                </div>
                <div className="footer-buttons">
                    <button className="submit-button">Guardar cambios</button>
                    <button className="cancel-button">Cancelar</button>
                </div>
            </form>
        </div>
    )
}