import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../../../../../src/models/User";
import { ErrorAlert, InfoAlert } from "../../../Components/Alert/Alert";
import Button from "../../../Components/Button/Button";
import Modal from "../../../Components/Modal/Modal";
import useUser from "../../../Hooks/useUser";
import { editUser, searchUsers } from "../../../redux/actions/actions";
import { handleDeleteUser } from "../../User/User";
type Props = {
  users: IUser[];
  header?: boolean;
};
import style from "./ListUsers.module.scss";

export default function ListUsers({ users, header = true }: Props) {
  const userLog = useUser();
  const [user, setUser] = useState<IUser>();
  const [role, setRole] = useState("");
  const [editRole, setEditRole] = useState(false);
  const dispatch = useDispatch();

  const deleteUser = (id: string | undefined, uid: string) => {
    if (userLog?._id && id)
      handleDeleteUser(id, userLog._id, uid).then(() => {
        dispatch(searchUsers(""));
      });
  };
  const makeAdmin = async (username: string) => {
    try {
      await axios.post("/admin", { username });
      InfoAlert.fire("Exito");
      dispatch(searchUsers(""));
    } catch (error) {
      ErrorAlert.fire("Hubo un error" + error);
    }
  };
  const changeRole = (e: any) => {
    e.preventDefault();
    setRole(e.target.value);
  };
  const submitRole = async (id: string, changes: any) => {
    try {
      await axios.put("/user", { _id: id, changes });
      setEditRole(false);
      InfoAlert.fire("Exito");
      dispatch(searchUsers(""));
    } catch (error) {
      ErrorAlert.fire("Hubo un error" + error);
    }
  };

  return (
    <ul className={style.list}>
      {users.length !== 0 && header && (
        <li>
          <h2>Nombre</h2>
          <h2>Email</h2>
          <h2>Username</h2>
          <h2>Acciones</h2>
        </li>
      )}
      {users.length ? (
        users?.map((user) => (
          <li>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.username}</h3>
            <div className={style.buttons}>
              <Button
                backgroundColor="#0c0c0c"
                onClick={() => deleteUser(user._id, user.uid)}
                disabled={(user.admin || user.master) && !userLog?.master}
              >
                Eliminar usuario
              </Button>
              {/*    <Button
                backgroundColor="#0c0c0c"
                disabled={(user.admin || user.master) && !userLog?.master}
              >
                Banear usuario
              </Button> */}
              <Button
                backgroundColor="#0c0c0c"
                disabled={(user.admin || user.master) && !userLog?.master}
                onClick={() => {
                  setUser(user);
                  setEditRole(true);
                }}
              >
                Cambiar rol
              </Button>
              {userLog?.master && (
                <Button
                  backgroundColor="#0c0c0c"
                  disabled={(user.admin || user.master) && !userLog?.master}
                  onClick={() =>
                    typeof user.username == "string" && makeAdmin(user.username)
                  }
                >
                  {user.admin ? "Eliminar rol de Admin" : "Dar rol de admin"}
                </Button>
              )}
            </div>
          </li>
        ))
      ) : (
        <h3>No hay usuarios</h3>
      )}
      <Modal isOpen={editRole} setIsOpen={setEditRole} title="Editar Rol">
        <div className={style.wrapEditRole}>
          <h2>Selecciona el rol:</h2>
          <select className={style.editRole} onChange={changeRole}>
            <option
              value="Estudiante"
              selected={user?.role === "Estudiante" ? true : false}
            >
              Estudiante
            </option>
            <option value="TA" selected={user?.role === "TA" ? true : false}>
              TA
            </option>
            <option
              value="Instructor"
              selected={user?.role === "Instructor" ? true : false}
            >
              Instructor
            </option>
          </select>
        </div>
        <Button
          onClick={() => {
            user?._id && submitRole(user._id, { role });
            setUser(undefined);
          }}
        >
          Aceptar
        </Button>
      </Modal>
    </ul>
  );
}
