import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/firebase";
import useUser from "../../Hooks/useUser";

import Button from '../Button/Button'
import styles from './ChangeKey.module.scss'
import { InfoAlert } from "../Alert/Alert";

export default function ChangeKey({cancel}:any){
	const user = useUser();
	interface InputPS {
		currentPassword: string,
		newPassword: string,
		confirmPassword: string
	}

	const [input, setInput] = useState<InputPS>({
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	});

	interface ErrorsPS {
		newPassword: boolean,
		confirmPassword: boolean
	}

	const [errors, setErrors] = useState<ErrorsPS>({
		newPassword: false,
		confirmPassword: false
	});

	const [complete, setComplete] = useState(false);

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): any => {
		const target = e.target;
		switch (target.name) {
			case "newPassword":
				if(!(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/.test(target.value))) {
					setErrors({
						...errors,
						[target.name]: true
					});
					return;
				}
				break;
			case "confirmPassword":
				if(input.newPassword !== target.value) {
					setErrors({
						...errors,
						[target.name]: true
					})
					return;
				}
				break;
			default:
				break;
		};
		target.id = "";
		setErrors({
			...errors,
			[target.name]: false
		});
		setInput({
			...input,
			[target.name]: target.value
		});
	};

	const saveNewPassword = (e: React.FormEvent) => {
		e.preventDefault();
		if(input.newPassword.length === 0 || input.confirmPassword.length === 0) return;
		if(input.newPassword !== input.confirmPassword) return;

		const newPassword = input.newPassword;

		if(!(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/.test(newPassword))) return;


		console.log(input);
		if(auth.currentUser && user) {
			console.log(auth.currentUser);
			const credential = EmailAuthProvider.credential(user.email, input.currentPassword);
				reauthenticateWithCredential(auth.currentUser, credential)
					.then(userCredential => {
						console.log(userCredential);
						return updatePassword(userCredential.user, input.newPassword);
					})
					.then(r => {
						cancel(e, true);
						InfoAlert.fire({
							title: "Tu contraseña se ha actualizado con exito",
							icon: "success"
						})
					})
					.catch(err => {
						cancel(e, true);
						InfoAlert.fire({
							title: "Tu contraseña actual es incorrecta",
							icon: "error"
						})
					});
		}
	}

	useEffect(() => {
		let complete = true;
    let k: keyof ErrorsPS;
    for (k in errors) {
      if (errors[k]) {
        complete = false;
      }
    }

    setComplete(complete);
	}, [errors])

	return(
		<div className={styles.changeKey}>
			<form className={styles.formulario}>
				<div className={styles.inputs}>
					<span 
					className={styles.password}>
						<input 
							type='password'
							placeholder='.'
							name='currentPassword'
							onChange={handleChanges}
							>
						</input>
						<span>Contraseña actual</span>
					</span>
					<span 
					className={styles.password}>
						<input 
							id={errors.newPassword ? styles.inv_new_ps : "new_ps"}
							type='password'
							placeholder='.'
							name='newPassword'
							onChange={handleChanges}
						>
						</input>
						<span>Nueva contraseña</span>
					</span>
					<span 
					className={styles.password}>
						<input 
							id={errors.confirmPassword ? styles.inv_conf_ps : "conf_ps"}
							type='password'
							placeholder='.'
							name='confirmPassword'
							onChange={handleChanges}
							>
						</input>
						<span>Reingresa nueva contraseña</span>
					</span>
				</div>
				<div className={styles.buttons}>
					<Button
						disabled={!complete}
						onClick={saveNewPassword}
					>Confirmar</Button>
					<Button
					onClick={cancel}>Cancelar</Button>
				</div>
			</form>
		</div>
	)
}