import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../Button/Button";
import style from "./Settings.module.scss";
import Input from "../Input/Input";
import axios from "axios";
import { editUser } from "../../redux/actions/actions";
import useUser from "../../Hooks/useUser";

import Avatar from "../Avatar/Avatar";
import { InfoAlert } from "../Alert/Alert";
import { useDispatch } from "react-redux";


export default function Settings({ cancel }: any) {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [changes, setChanges] = useState({
    username: user?.username,
    bio: user?.bio,
    linkedin: user?.linkedin,
    github: user?.github,
    portfolio: user?.portfolio,
    role: user?.role,
  });

  const [errors, setErrors] = useState({
    username: false,
    linkedin: false,
    github: false,
    portfolio: false,
  })

  let typerTimer: NodeJS.Timeout;

  const validateUsername = ({ target }: any) => {
    const btn = document.querySelector("#saveChanges");
    axios.get("/user", {
      params: {
        username: target.value,
      },
    }).then(r => {
      console.log(r.data);
      if(r.data === null) return handleChanges({target});
      if(r.data?._id === user?._id) {
        setErrors({...errors, username: false });
        btn.disabled = false;
        return;
      }
      setErrors({
        ...errors,
        username: true
      });
      btn.disabled = true;
    });
  }


  const handleChanges = ({ target } : any):void => {
    const btn = document.querySelector("#saveChanges");
    switch (target.name) {
      case "username": 
        if(target.value.length === 0) {
          btn.disabled = true;
          setErrors({...errors, [target.name]: true });
          throw new Error("The username field can't be empty");
        }
        if(!(/^[a-zA-Z0-9_-]{3,15}$/.test(target.value))) {
          setErrors({...errors, [target.name]: true });
          btn.disabled = true;
        }
        break;
      case "github": 
        console.log(!(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(target.value)));
        if(!(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(target.value))) {
          setErrors({...errors, [target.name]: true });
          btn.disabled = true;
          return;
        }
        break;
      case "linkedin":
        if(!(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/.test(target.value))) {
          setErrors({...errors, [target.name]: true });
          btn.disabled = true;
          return;
        }
        break;
      case "portfolio":
          if(!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(target.value))) {
            setErrors({...errors, [target.name]: true });
            btn.disabled = true;
            return;
          }
        break
      default: 
        break
    }

    btn.disabled = false;

    setErrors({
      ...errors, 
      [target.name]: false
    });

    setChanges({
      ...changes,
      [target.name]: target.value.length === 0 ? null : target.value
    });
  }

  const saveChanges = (e: any): void => {
    e.preventDefault();
    axios.put("/user", {
      _id: user?._id, changes
    }).then(({data: user}) => {
      cancel(e);
      dispatch(editUser(user));
      InfoAlert.fire({
        title: "Se actualizó tu perfil!",
        icon: "success"
      });
      navigate(`/profile/${changes.username}`);
    }).catch(err => {
      cancel(e);
      console.log(err);
      InfoAlert.fire({
        title: "No se pudo actulizar tu perfil",
        icon: "error"
      });
    });
  }

  const onChangeRole = (e: any): void => {
    if(user?.admin) {
      setChanges({
        ...changes,
        role: e.target.value
      });
    } else throw new Error("Only admins can change roles");
    
  }

  useEffect(() => {
    console.log(errors.github);
  }, [errors])

  return (
    <form className={style.settings_wrap}>
      <Avatar avatar={user?.avatar}/>
      <div>
        <div className={style.inputBox}>
          <h3>Nombre de usuario</h3>
          <Input
            error={errors.username}
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            onKeyUp={(e: any) => {
              clearTimeout(typerTimer);
              typerTimer = setTimeout(() => validateUsername(e), 500);
            }}
            onKeyDown={() => {
              clearTimeout(typerTimer);
            }}
            onBlur={validateUsername}
            defaultValue={changes?.username}
          ></Input>
        </div>
        <div className={style.inputBox}>
          <h3>Biografia</h3>
          <Input 
            onChange={handleChanges}
            name="bio"
            placeholder="Escribe sobre ti..."
            defaultValue={changes?.bio}></Input>
        </div>
        <div className={style.buttons}>
          <Button
            type="button"
            active={changes?.role === "Estudiante"}
            onClick={onChangeRole}
            disabled={user?.admin ? false : true}
            value="Estudiante">Estudiante</Button>
          <Button 
            type="button"
            active={changes?.role === "Instructor"}
            onClick={onChangeRole}
            disabled={user?.admin ? false : true}
            value="Instructor">Instructor</Button>
          <Button 
            type="button"
            active={changes?.role === "TA"}
            onClick={onChangeRole}
            disabled={user?.admin ? false : true}
            value="TA">TA</Button>
        </div>

        <Input 
          type="text" 
          name="github"
          error={errors.github}
          onChange={handleChanges}
          placeholder="Ingresa tu Usuario de Github" 
          defaultValue={changes?.github}
          ></Input>
        <Input
          type="url"
          error={errors.linkedin}
          onChange={handleChanges}
          placeholder="Ingresa la Url de tu Linkedin"
          name="linkedin"
          defaultValue={changes?.linkedin}
        ></Input>
        <Input
          type="url"
          error={errors.portfolio}
          onChange={handleChanges}
          placeholder="Ingresa la Url de tu portafolio"
          name="portfolio"
          defaultValue={changes?.portfolio}
        ></Input>
        <div className={style.buttons}>
          <Button
            type="submit"
            id="saveChanges"
            className={style.submit_button}
            disabled={(():boolean => {
              let complete = false;
              for(const err in errors) {
                if(errors[err]){
                  complete = true;
                }
              }
              return complete;
            })()}
            onClick={saveChanges}>Guardar cambios</Button>
          <Button
            className={style.cancel_button}
            onClick={(e: any) => cancel(e)}
            active
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
