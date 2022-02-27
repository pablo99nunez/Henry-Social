import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import styles from "./SideTags.module.scss";
import { HiLink } from "react-icons/hi";
import {
  filterByTag,
  filterBySection,
} from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";

const SideTags = () => {
  const initialActiveSection = {
    empleo: false,
    boom: false,
    servicio: false,
    pregunta: false,
    recurso: false,
    curso: false,
  };

  const [activeSection, setActiveSection] = useState<any>(initialActiveSection);

  const posts = useSelector((state: IState) => state.posts);
  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    if(e.target.classList.contains("category")) {
      setActiveSection({ ...initialActiveSection, [e.target.id]: true });
      return dispatch(filterBySection(e.target.id));
    } else {
      return dispatch(filterByTag(e.target.title));
    }
  };

  useEffect(() => {
    if (posts?.length === 0) {
      InfoAlert.fire({
        title: "No se encontraron post para el tag indicado",
        icon: "info",
      });
    }
  }, [posts]);

  
  return (
    <aside className={styles.aside_tags}>
      <nav className={styles.aside_sections}>
        <ul>
          <li
            className={activeSection.empleo ? `${styles.active} category` : "category"}
            onClick={handleClick}
            id="empleo"
          >
            Ofertas Laborales
          </li>
          <li
            className={activeSection.boom ? `${styles.active} category` : "category"}
            onClick={handleClick}
            id="boom"
          >
            Booms
          </li>
          <li
            className={activeSection.servicio ? `${styles.active} category` : "category"}
            onClick={handleClick}
            id="servicio"
          >
            Servicios
          </li>
          <li
            className={activeSection.pregunta ? `${styles.active} category` : "category"}
            onClick={handleClick}
            id="pregunta"
          >
            Preguntas Frecuentes
          </li>
          <li
            className={activeSection.recurso ? `${styles.active} category` : "category"}
            onClick={handleClick}
            id="recurso"
          >
            Recursos
          </li>
          <li
            className={activeSection.curso ? `${styles.active} category` : "category"}
            onClick={handleClick}
            id="curso"
          >
            Cursos Gratuitos
          </li>
        </ul>
      </nav>
      <div className={styles.aside_tags_popular}>
        <h2>Tags Populares</h2>
        <nav className={styles.aside_tags_enlaces}>
          <ul>
            <li
            className="tags"
            onClick={handleClick}
            title="react"
            >#ReactJS</li>
            <li
            className="tags"
            onClick={handleClick}
            title="javascript"
            >#JavaScript</li>
            <li
            className="tags"
            onClick={handleClick}
            title="frontend"
            >#Frontend</li>
            <li
            className="tags"
            onClick={handleClick}
            title="backend"
            >#Backend</li>
            <li
            className="tags"
            onClick={handleClick}
            title="ayuda"
            >#NecesitoAyuda</li>
          </ul>
        </nav>
      </div>

      <div className={styles.aside_enlaces}>
        <div className={styles.aside_tags_enlaces}>
          <a href="https://talent.soyhenry.com" target="_blank">
            {" "}
            <HiLink /> Henry Talent
          </a>
          <a href="https://students.soyhenry.com/" target="_blank">
            {" "}
            <HiLink /> Henry Student
          </a>
          <a href="http://calendario.soyhenry.com/" target="_blank">
            {" "}
            <HiLink /> Henry Calendary
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SideTags;
