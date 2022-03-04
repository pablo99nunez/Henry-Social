import React from 'react'
import Button from '../Button/Button'
import styles from './ChangeKey.module.scss'

export default function ChangeKey({cancel}:any){
    return(
        <div className={styles.changeKey}>
            <form className={styles.formulario}>

                <span 
                className={styles.password}>
                    <input 
                    type='password'
                    placeholder='.'>
                    </input>
                    <span>Contraseña actual</span>
                </span>
                <span 
                className={styles.password}>
                    <input 
                    type='password'
                    placeholder='.'>
                    </input>
                    <span>Nueva contraseña</span>
                </span>
                <span 
                className={styles.password}>
                    <input 
                    type='password'
                    placeholder='.'>
                    </input>
                    <span>Reingresa nueva contraseña</span>
                    </span>
                <div className={styles.buttons}>
                <Button
                
                >Confirmar</Button>
                <Button
                onClick={cancel}>Cancelar</Button>
                </div>
            </form>
        </div>
    )
}