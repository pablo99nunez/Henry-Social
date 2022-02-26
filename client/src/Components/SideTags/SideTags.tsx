import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import styles from "./SideTags.module.scss";
import { HiLink } from "react-icons/hi";
import {
  filterByFollow,
  filterBySection,
  getPosts,
} from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import { Link } from "react-router-dom";
import { Like } from "../Like/Like";
const SideTags = () => {
  const posts = useSelector((state: IState) => state.results);
  const dispatch = useDispatch();


  const handleClick = (e: any) => {
    if (posts.length === 0) {
      InfoAlert.fire({
        title: "No se encontraron post para el tag indicado",
        icon: "info",
      });
    } else {
      if (e.target.id !== "seguidos") dispatch(filterBySection(e.target.id));
      else dispatch(filterByFollow());
    }
  };

  return (
    <aside className={styles.aside_tags}>
      <div className={styles.aside_sections}>
        <ul>
          <li
            onClick={(e) => {
              handleClick(e);
            }}
            id="empleo"
          >
            Ofertas laborales

          </li>
          <li
            onClick={(e) => {
              handleClick(e);
            }}
            id="seguidos"
          >
            Seguidos
          </li>
          <li
            onClick={(e) => {
              handleClick(e);
            }}
            id="boom"
          >
            Booms
          </li>
          <li
            onClick={(e) => {
              handleClick(e);
            }}
            id="servicio"
          >
            Servicios
          </li>
          <li>Preguntas frecuentes</li>
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
