import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavSearch from "../../Components/NavSearch/NavSearch";
import useUser from "../../Hooks/useUser";
import style from "./Admin.module.scss";
import Denuncias from "./Denuncias/Denuncias";
import Roles from "./Roles/Roles";
import Solicitudes from "./Solicitudes/Solicitudes";

export default function Admin() {
  const [page, setPage] = useState("");
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.admin && !user?.master) {
      navigate("/error");
    }
  });
  return (
    <>
      <NavSearch></NavSearch>
      <div className={style.admin}>
        <aside className={style.panel}>
          <h1>Panel administrador</h1>
          <ul>
            <li
              onClick={() => setPage("Roles")}
              className={`${page === "Roles" && style.active}`}
            >
              <h3>Gestión de usuarios</h3>
            </li>
            <li
              onClick={() => setPage("Denuncias")}
              className={`${page === "Denuncias" && style.active}`}
            >
              <h3>Publicaciones denunciadas</h3>
            </li>
            <li
              onClick={() => setPage("Solicitudes")}
              className={`${page === "Solicitudes" && style.active}`}
            >
              <h3>Solicitudes</h3>
            </li>
          </ul>
        </aside>
        <div className={style.main}>
          {
            {
              "": (
                <div className={style.title}>
                  <h1>
                    <strong>Bienvenido al panel administrativo.</strong>
                  </h1>
                  <h2>
                    Clicá en alguna opción del menú de la izquierda para
                    comenzar
                  </h2>
                </div>
              ),
              Roles: <Roles></Roles>,
              Denuncias: <Denuncias></Denuncias>,
              Solicitudes: <Solicitudes></Solicitudes>,
            }[page]
          }
        </div>
      </div>
    </>
  );
}
