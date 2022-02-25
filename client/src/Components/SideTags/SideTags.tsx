import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import styles from "./SideTags.module.scss";
import { HiLink } from "react-icons/hi";
import { filterBySection, getPosts } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
const SideTags = () => {
  const posts = useSelector((state: IState) => state.posts);
  const dispatch = useDispatch();

  const handleClick = (e:any) => {
      if(posts.length === 0) {
        InfoAlert.fire({
            title:"No se encontraron post para el tag indicado",
            icon:"info"
        })
      } else {
        dispatch(filterBySection(e.target.name));
      }
      
  }
  return (
    <aside className={styles.aside_tags}>
      <div className={styles.aside_sections}>
        <h2>Secciones</h2>
        <ul>
          <li>
              <input onClick={e=>{handleClick(e)}} type="button" name= "" value="Publicaciones" />
          </li>
          <li>
              <input onClick={e=>{handleClick(e)}} type="button" name= "empleo" value="Ofertas laborales" />
          </li>
          <li>
            <input onClick={e=>{handleClick(e)}} type="button" name = "boom" value="Booms" />
          </li>
          <li>
            <input onClick={e=>{handleClick(e)}} type="button" name = "servicio" value="Servicios" />
          </li>
          <li>
            <input type="button" value="Preguntas frecuentes" />
          </li>
          <li>
            <input type="button" value="Recursos" />
          </li>
          <li>
            <input type="button" value="Cursos gratuitos" />
          </li>
        </ul>
      </div>
      <div className={styles.aside_tags_popular}>
        <h2>Tags Populares</h2>
        <div className={styles.aside_tags_enlaces}>
          <a href="#">#ReactJS</a>
          <a href="#">#JavaScript</a>
          <a href="#">#Frontend</a>
          <a href="#">#Backend</a>
          <a href="#">#NecesitoAyuda</a>
        </div>
      </div>
      <div className={styles.aside_enlaces}>
        <h2>Enlaces</h2>
        <div className={styles.aside_tags_enlaces}>
          <a href="#">
            {" "}
            <HiLink /> Henry Talent
          </a>
          <a href="#">
            {" "}
            <HiLink /> Henry Student
          </a>
          <a href="#">
            {" "}
            <HiLink /> Henry Calendary
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SideTags;
