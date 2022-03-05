import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { IconContext } from "react-icons";
import { uploadFile } from "../../../src/firebase/Helpers/uploadFile";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ChangeKey from "../ChangeKey/ChangeKey";
import style from "./Settings.module.scss";
import Input from "../Input/Input";
import axios from "axios";
import { editUser } from "../../redux/actions/actions";
import useUser from "../../Hooks/useUser";

export default function Settings({ cancel }: any) {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const btn = useRef<HTMLButtonElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);

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
  });
  const [key, setKey] = useState(false);
  const cambiarClave = () => {
    setKey(true);
  };
  const [complete, setComplete] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  useEffect(() => {
    let complete = true;
    Object.keys(errors).forEach((e) => {
      if (errors[e]) {
        complete = false;
      }
    });
    setComplete(complete);
  }, [errors]);

  useEffect(() => {
    return () => {
      cancel();
      navigate(`/profile/${changes.username}`);
    };
  }, [user]);

  let typerTimer: NodeJS.Timeout;

  const validateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    axios
      .get("/user", {
        params: {
          username: target.value,
        },
      })
      .then((r) => {
        if (r.data === null) return handleChanges(e);
        if (r.data?._id === user?._id) {
          setErrors({ ...errors, username: false });
          return;
        }
        setErrors({
          ...errors,
          username: true,
        });
        if (btn.current) btn.current.disabled = true;
      });
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    switch (target.name) {
      case "username":
        if (target.value.length === 0) {
          setErrors({ ...errors, [target.name]: true });
          throw new Error("The username field can't be empty");
        }
        if (!/^[a-zA-Z0-9_-]{3,15}$/.test(target.value)) {
          setErrors({ ...errors, [target.name]: true });
        }
        break;
      case "github":
        if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(target.value)) {
          if (!target.value.length) {
            setChanges({
              ...changes,
              [target.name]: target.value.length === 0 && null,
            });
            return setErrors({ ...errors, [target.name]: false });
          }
          return setErrors({ ...errors, [target.name]: true });
        }
        break;
      case "linkedin":
        if (
          !/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/.test(
            target.value
          )
        ) {
          if (!target.value.length) {
            setChanges({
              ...changes,
              [target.name]: target.value.length === 0 && null,
            });
            return setErrors({ ...errors, [target.name]: false });
          }
          return setErrors({ ...errors, [target.name]: true });
        }
        break;
      case "portfolio":
        if (
          !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
            target.value
          )
        ) {
          if (!target.value.length) {
            setChanges({
              ...changes,
              [target.name]: target.value.length === 0 && null,
            });
            return setErrors({ ...errors, [target.name]: false });
          }
          return setErrors({ ...errors, [target.name]: true });
        }
        break;
      case "avatar":
        if (target.files) {
          setNewAvatar(URL.createObjectURL(target.files[0]));
          return;
        }
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [target.name]: false,
    });

    setChanges({
      ...changes,
      [target.name]: target.value.length === 0 ? null : target.value,
    });
  };

  const saveChanges = async (e: any) => {
    e.preventDefault();
    let imgUrl: string;
    if (imgInput.current?.files && imgInput.current?.files?.length !== 0) {
      imgUrl = await uploadFile(imgInput.current.files[0]);
      if (user?._id)
        dispatch(editUser(user._id, { ...changes, avatar: imgUrl }));

      /* axios
      .put("/user", {
        _id: user?._id,
        changes: { ...changes, avatar: imgUrl },
      })
      .then(({ data: user }) => {
        cancel(e);
        dispatch(editUser(user));
        InfoAlert.fire({
          title: "Se actualizó tu perfil!",
          icon: "success",
        });
        navigate(`/profile/${changes.username}`);
      })
      .catch((error) => {
        cancel(e);
        console.log(error);
        InfoAlert.fire({
          title: "No se pudo actulizar tu perfil",
          icon: "error",
        });
      }); */
    }
    if (user?._id) dispatch(editUser(user._id, changes));
  };
  const onChangeRole = (e: any): void => {
    if (user?.admin) {
      setChanges({
        ...changes,
        role: e.target.value,
      });
    } else throw new Error("Only admins can change roles");
  };

  return (
    <>
      <Modal isOpen={key} setIsOpen={setKey} title="Cambiar contraseña">
        <ChangeKey
          cancel={(e?: any) => {
            e && e.preventDefault();
            return setKey(false);
          }}
        />
      </Modal>
      <form className={style.settings_wrap}>
        <div id={style.avt_cont}>
          <img
            src={
              newAvatar ||
              (typeof user?.avatar === "string" && user?.avatar) ||
              "https://s5.postimg.cc/537jajaxj/default.png"
            }
            alt="avatar"
          />
          <label htmlFor="newAvatar" id={style.editIcon}>
            <IconContext.Provider value={{ color: "yellow", size: "35px" }}>
              <BiEdit />
            </IconContext.Provider>
          </label>
          <input
            ref={imgInput}
            name="avatar"
            id="newAvatar"
            onChange={handleChanges}
            type="file"
          />
        </div>
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
              defaultValue={changes?.bio}
            ></Input>
          </div>
          <div className={style.buttons}>
            <Button
              type="button"
              active={changes?.role === "Estudiante"}
              onClick={onChangeRole}
              disabled={user?.admin ? false : true}
              value="Estudiante"
            >
              Estudiante
            </Button>
            <Button
              type="button"
              active={changes?.role === "Instructor"}
              onClick={onChangeRole}
              disabled={user?.admin ? false : true}
              value="Instructor"
            >
              Instructor
            </Button>
            <Button
              type="button"
              active={changes?.role === "TA"}
              onClick={onChangeRole}
              disabled={user?.admin ? false : true}
              value="TA"
            >
              TA
            </Button>
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
              backgroundColor="#000"
              disabled={!complete}
              onSubmit={cancel}
              onClick={saveChanges}
            >
              Guardar cambios
            </Button>
            <Button onClick={cancel} backgroundColor="#FF1">
              Cancelar
            </Button>
            <Button>Eliminar perfil</Button>
          </div>
          <a className={style.changeKey} onClick={cambiarClave}>
            Cambiar clave
          </a>
        </div>
      </form>
    </>
  );
}
