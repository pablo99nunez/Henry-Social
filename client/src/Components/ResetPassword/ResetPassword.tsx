import React, { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

import style from "./ResetPassword.module.scss";
import LoginInput from "../LoginInput/LoginInput";
import Button from "../Button/Button";
import { InfoAlert } from "../Alert/Alert";

export default function ResetPassword({ cancel }: any) {
  const [email, setEmail] = useState<string>("");
  const [emailValidity, setEmailValidity] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(target.value)) {
      setEmail(target.value);
      setEmailValidity(true);
      return;
    }
    setEmailValidity(false);
    setEmail("");
  };

  const handleEmailSend = (e: any) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email, {
      url: import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://henry-social.web.app",
    })
      .then(() => {
        cancel(e);
        InfoAlert.fire({
          title: `Se ha enviado un email a ${email}`,
          icon: "success",
        });
      })
      .catch(() => {
        cancel(e);
        InfoAlert.fire({
          title: `No se pudo enviar el email`,
          icon: "error",
        });
      });
  };

  return (
    <div className={style.resetPassword}>
      <h3>
        Por favor ingresa tu direccion de correo electronico donde enviaremos un
        link para que puedas recuperar tu contraseña.
      </h3>
      <LoginInput
        onChange={handleInput}
        className={emailValidity ? "" : style.invalid}
        type="email"
        id="email"
        name="email"
        placeholder="Introduce tu email"
      />
      <div className={style.buttons}>
        <Button onClick={handleEmailSend} disabled={!emailValidity}>
          Confirmar
        </Button>
        <Button onClick={cancel}>Cancelar</Button>
      </div>
    </div>
  );
}
