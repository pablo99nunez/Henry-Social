import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../../../../../src/models/User";
import { ErrorAlert, InfoAlert } from "../../../Components/Alert/Alert";
import Button from "../../../Components/Button/Button";
import Modal from "../../../Components/Modal/Modal";
import useUser from "../../../Hooks/useUser";
import { searchUsers } from "../../../redux/actions/actions";
import { handleDeleteUser } from "../../User/User";
type Props = {
  users: IUser[];
};
import style from "./ListUsers.module.scss";

export default function ListUsers({ users }: Props) {
  const userLog = useUser();
  const [editRole, setEditRole] = useState(false);
  const [role, setRole] = useState("");
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

  return (
    <ul className={style.list}>
      {users.length !== 0 && (
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
                onClick={() => setEditRole(true)}
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
            <Modal isOpen={editRole} setIsOpen={setEditRole} title="Editar Rol">
              <div className={style.buttons}>
                <Button
                  active={(role || user.role) == "TA"}
                  onClick={() => setRole("TA")}
                >
                  TA
                </Button>
                <Button
                  active={(role || user.role) == "Estudiante"}
                  onClick={() => setRole("Estudiante")}
                >
                  Estudiante
                </Button>
                <Button
                  active={(role || user.role) == "Instructor"}
                  onClick={() => setRole("Instructor")}
                >
                  Instructor
                </Button>
              </div>
            </Modal>
          </li>
        ))
      ) : (
        <h3>No hay usuarios</h3>
      )}
    </ul>
  );
}
