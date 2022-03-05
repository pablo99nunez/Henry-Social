import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from "../../redux/reducer/index";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { auth } from "../../../../src/services/firebase/firebase";
import { sendEmailVerification } from 'firebase/auth';

import { closeSession } from "../../../../src/services/firebase/login-methods";
import { signOut } from "../../redux/actions/actions";
import { InfoAlert } from "../../Components/Alert/Alert";
import style from "./Verification.module.scss";
import LoadingPage from '../../Components/LoadingPage/LoadingPage';

const Verification: React.FC = () => {
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  const handleSignOut = async () => {
    await closeSession()
      .then(() => {
        dispatch(signOut());
        InfoAlert.fire("Has cerrado sesion");
      })
      .catch((e) =>
        InfoAlert.fire({
          title: "No pudiste cerrar sesion" + e.message,
          icon: "error",
        })
      );

    navigate("/login");
  };

  const handleResend = () => {
    if(auth.currentUser) sendEmailVerification(auth.currentUser, {
      url: "http://localhost:3000"
    });
  }

  useEffect(() => {
    if(auth.currentUser?.emailVerified) return navigate("/");
    setVerifying(false);
  })

  return (
    <>{
      verifying ? <LoadingPage/>
      : <div id={style.cont}>
      <Helmet>
          <meta charSet="utf-8"/>
          <meta name="Error Page" content="Verifica tu email"/>
          <title>Verificación | Henry Social</title>
      </Helmet>
      <div id={style.ver_cont}>
        <div id={style.msg}>
          <h1>Verificación</h1>
          <p>Ahora necesitamos verificar tu correo electrónico. Te hemos enviado un correo a <span>{user?.email}</span>. Por favor, sigue el link en el email para continuar y acceder a la aplicación.</p>
        </div>
        <div id={style.btns}>
          <button
            onClick={handleResend}
          >Reenviar email</button>
          <button
            onClick={handleSignOut}
          >Cerrar sesión</button>
        </div>
      </div>
    </div>
    }</>
  )
}

export default Verification;
