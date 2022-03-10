import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../../redux/actions/actions";
import { IState } from "../../../redux/reducer";
import ListUsers from "../ListUsers/ListUsers";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";
import style from "./Roles.module.scss";
import Input from "../../../Components/Input/Input";

export default function Roles() {
  const users = useSelector((state: IState) => state.Users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchUsers(""));
  }, []);
  return (
    <div className={style.rolesPage}>
      <header>
        <h1>Gestión de usuarios</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Busca un usuario"
            onChange={(e) => dispatch(searchUsers(e.target.value))}
          />
          <motion.div
            className={style.reload}
            whileHover={{ rotateZ: 360, transition: { duration: 1 } }}
          >
            <AiOutlineReload onClick={() => dispatch(searchUsers(""))} />
          </motion.div>
        </div>
      </header>
      <div>
        <h1>Master</h1>
        <ListUsers users={users.filter((e) => e.master)}></ListUsers>
      </div>
      <div>
        <h1>Admin</h1>
        <ListUsers users={users.filter((e) => e.admin)}></ListUsers>
      </div>
      <div>
        <h1>Instructor</h1>
        <ListUsers
          users={users.filter((e) => e.role == "Instructor")}
        ></ListUsers>
      </div>
      <div>
        <h1>TA</h1>
        <ListUsers users={users.filter((e) => e.role == "TA")}></ListUsers>
      </div>
      <div>
        <h1>Estudiante</h1>
        <ListUsers
          users={users.filter((e) => e.role == "Estudiante")}
        ></ListUsers>
      </div>
    </div>
  );
}
