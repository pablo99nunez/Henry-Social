import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import styles from "./SideTags.module.scss";
import { HiLink } from "react-icons/hi";
import { filterBySection, getPosts } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
const SideTags = () => {

  const initialActiveSection = {
    empleo: false,
    boom: false,
    servicio: false,
    pregunta: false,
    recurso: false,
    curso: false,
  }

  const [activeSection, setActiveSection] = useState<any>(initialActiveSection);

  const posts = useSelector((state: IState) => state.posts);
  const dispatch = useDispatch();

  const handleClick = (e:any) => {
    setActiveSection({...initialActiveSection, [e.target.id]: true})
    dispatch(filterBySection(e.target.id));
  }
  
  useEffect(() => {

    if(posts?.length === 0) {
      InfoAlert.fire({
          title:"No se encontraron post para el tag indicado",
          icon:"info"
      })
    }

  }, [posts])
  

  console.log(activeSection);
  

  return (
    <aside className={styles.aside_tags}>
      <nav className={styles.aside_sections}>
        <ul>
          <li className={activeSection.empleo ? styles.active : ''} onClick={handleClick} id="empleo">Ofertas Laborales</li>
          <li className={activeSection.boom ? styles.active : ''} onClick={handleClick} id="boom">Booms</li>
          <li className={activeSection.servicio ? styles.active : ''} onClick={handleClick} id="servicio">Servicios</li>
          <li className={activeSection.pregunta ? styles.active : ''} onClick={handleClick} id="pregunta">Preguntas Frecuentes</li>
          <li className={activeSection.recurso ? styles.active : ''} onClick={handleClick} id="recurso">Recursos</li>
          <li className={activeSection.curso ? styles.active : ''} onClick={handleClick} id="curso">Cursos Gratuitos</li>
        </ul>
      </nav>
      <div className={styles.aside_tags_popular}>
        <h2>Tags Populares</h2>
        <nav className={styles.aside_tags_enlaces}>
          <ul>
            <li>#ReactJS</li>
            <li>#JavaScript</li>
            <li>#Frontend</li>
            <li>#Backend</li>
            <li>#NecesitoAyuda</li>
          </ul>
        </nav>
      </div>
      <div className={styles.aside_enlaces}>
        <div className={styles.aside_tags_enlaces}>
          <a href="#" target="_blank">
            {" "}
            <HiLink /> Henry Talent
          </a>
          <a href="#" target="_blank">
            {" "}
            <HiLink /> Henry Student
          </a>
          <a href="#" target="_blank">
            {" "}
            <HiLink /> Henry Calendary
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SideTags;
