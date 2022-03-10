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
import { editUser, signOut } from "../../redux/actions/actions";
import useUser from "../../Hooks/useUser";
import { auth } from "../../firebase/firebase";
import { InfoAlert } from "../Alert/Alert";
import { IDone } from "../../../../src/models/Request";

export default function Settings({ cancel }: any) {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const btn = useRef<HTMLButtonElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);
  interface Changes {
    username: string | null | undefined;
    bio: string | null | undefined;
    linkedin: string | null | undefined;
    github: string | null | undefined;
    portfolio: string | null | undefined;
    role: string | null | undefined;
  }
  const [changes, setChanges] = useState<Changes>({
    username: user?.username,
    bio: user?.bio,
    linkedin: user?.linkedin,
    github: user?.github,
    portfolio: user?.portfolio,
    role: user?.role,
  });
  interface Errors {
    username: boolean;
    linkedin: boolean;
    github: boolean;
    portfolio: boolean;
  }
  const [errors, setErrors] = useState<Errors>({
    username: false,
    linkedin: false,
    github: false,
    portfolio: false,
  });
  const [complete, setComplete] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [key, setKey] = useState(false);

  const changeKey = () => {
    setKey(true);
  };

  useEffect(() => {
    let complete = true;
    let k: keyof Errors;
    for (k in errors) {
      if (errors[k]) {
        complete = false;
      }
    }

    setComplete(complete);
  }, [errors]);

  useEffect(() => {
    return () => {
      cancel();
      navigate(`/profile/${changes.username}`);
    };
  }, [user]);

  let typerTimer: NodeJS.Timeout;

  const deleteUser = async () => {
    if (user?._id) {
      dispatch(signOut());
      await axios.delete("/delete-user", {
        data: {
          userId: user._id,
          adminId: user._id,
          uid: user.uid,
        },
      });
    }
  };

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
          if (target.value.length === 0) {
            setChanges({
              ...changes,
              [target.name]: "",
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
          if (target.value.length === 0) {
            setChanges({
              ...changes,
              [target.name]: "",
            });
            return setErrors({ ...errors, [target.name]: false });
          }
          return setErrors({ ...errors, [target.name]: true });
        }
        break;
      case "portfolio":
        if (
          !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
            target.value
          )
        ) {
          if (target.value.length === 0) {
            setChanges({
              ...changes,
              [target.name]: "",
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
    }
    if (changes.role && !user?.admin) {
      await axios.post("/request", {
        user: user?._id,
        solicitud: `${
          user?.name.split(" ")[0]
        } ha solicitado un cambio de rol a ${changes.role}`,
        done: IDone.Rol,
        data: JSON.stringify({
          _id: user?._id,
          changes: { role: changes.role },
        }),
      });
      InfoAlert.fire("Solicitud enviada");
    }
    const { bio, github, linkedin, portfolio, username } = changes;
    if (user?._id && user.admin) dispatch(editUser(user._id, changes));
    else if (user?._id)
      dispatch(
        editUser(user._id, { bio, github, linkedin, portfolio, username })
      );
  };
  const onChangeRole = (e: any): void => {
    setChanges({
      ...changes,
      role: e.target.value,
    });
  };

  return (
    <>
      <Modal isOpen={key} setIsOpen={setKey} title="Cambiar contraseña">
        <ChangeKey
          cancel={(e?: any, closeParent?: boolean) => {
            if (closeParent) cancel();
            e && e.preventDefault();
            return setKey(false);
          }}
        />
      </Modal>
      <form className={style.settings_wrap}>
        <div id={style.avt_cont}>
          <div>
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
          <p onClick={changeKey}>Cambiar contraseña</p>
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
              disabled={user?.role === "Estudiante" ? true : false}
              value="Estudiante"
            >
              Estudiante
            </Button>
            <Button
              type="button"
              active={changes?.role === "Instructor"}
              disabled={user?.role === "Instructor" ? true : false}
              onClick={onChangeRole}
              value="Instructor"
            >
              Instructor
            </Button>
            <Button
              type="button"
              active={changes?.role === "TA"}
              disabled={user?.role === "TA" ? true : false}
              onClick={onChangeRole}
              value="TA"
            >
              TA
            </Button>
            <div>
              <button
                title="En caso de que lo requieras puedes clickear en el rol que deseas y una 
            solicitud sera enviada a nuestros admins."
                className={style.solicitud}
                disabled
              >
                ?
              </button>
              <span></span>
            </div>
          </div>

          <div className={style.inputBox}>
            <span className={style.spaneo}>
              <input
                type="text"
                name="github"
                onChange={handleChanges}
                placeholder="."
                defaultValue={changes?.github || ""}
              ></input>
              <span>Ingresa tu Usuario de Github</span>
            </span>

            <span className={style.spaneo}>
              <input
                type="url"
                onChange={handleChanges}
                placeholder="."
                name="linkedin"
                defaultValue={changes?.linkedin || ""}
              ></input>
              <span>Ingresa la Url de tu Linkedin</span>
            </span>

            <span className={style.spaneo}>
              <input
                type="url"
                onChange={handleChanges}
                placeholder="."
                name="portfolio"
                //defaultValue={changes?.portfolio}
              ></input>
              <span>Ingresa la Url de tu portafolio</span>
            </span>
          </div>
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
            <Button type="button" onClick={deleteUser}>
              Eliminar perfil
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
