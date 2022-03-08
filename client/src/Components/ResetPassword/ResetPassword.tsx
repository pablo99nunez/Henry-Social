import React from "react";
import style from './ResetPassword.module.scss'
import LoginInput from "../LoginInput/LoginInput";
import Button from "../Button/Button";

export default function ResetPassword({cancel}:any){


    return(
        <div className={style.resetPassword}>
            <h3>Por favor ingresa tu direccion de correo electronico
                donde enviaremos un link para que puedas recuperar tu contraseña
            </h3>
            <LoginInput
            type='email'
            id="email"
            name="email"
            placeholder="Introduce tu email"
            />
            <div className={style.buttons}>
                <Button>Confirmar</Button>
                <Button onClick={cancel}>Cancelar</Button>
            </div>
        </div>
    )
}