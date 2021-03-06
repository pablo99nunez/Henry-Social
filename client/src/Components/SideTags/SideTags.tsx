/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import styles from "./SideTags.module.scss";
import { HiLink } from "react-icons/hi";
import {
  filterByTag,
  filterByType,
  getPosts,
  setActiveSection,
} from "../../redux/actions/actions";
import useUser from "../../Hooks/useUser";

const SideTags = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const { posts, activeSection} = useSelector((state: IState) => state);
  const [tags, setTags] = useState([]);

  const handleClick = (e: any) => {
    if (e.target.classList.contains("category")) {
      dispatch(setActiveSection(e.target.id))
      if (e.target.id === "all") dispatch(getPosts());
      return dispatch(filterByType(e.target.id));
    } else {
      dispatch(setActiveSection(''))
      return dispatch(filterByTag(e.target.title));
    }
  };

  useEffect(() => {
    const tags = posts
      ?.filter((e) => e.tags?.length > 0)
      .map((e) => e.tags)
      .flat(2)
      .filter((e) => e);

    const objPopulares: any = {};

    tags?.forEach((e: string) => {
      objPopulares[e] = objPopulares[e] ? objPopulares[e] + 1 : 1;
    });

    let tagsPopulares: any = [];

    Object.keys(objPopulares)?.forEach((key) => {
      tagsPopulares.push([key, objPopulares[key]]);
    });

    tagsPopulares = tagsPopulares
      .sort((a: any, b: any) => {
        if (a[1] < b[1]) return 1;
        else return -1;
      })
      .slice(0, 5);

    setTags(tagsPopulares);
  }, [posts]);

  return (
    <aside className={styles.aside_tags}>
      <nav className={styles.aside_sections}>
        <ul>
          <li
            className={
              activeSection === "all" ? `${styles.active} category` : "category"
            }
            onClick={handleClick}
            id="all"
          >
            Posts
          </li>
          <li
            className={
              activeSection === "empleo"
                ? `${styles.active} category`
                : "category"
            }
            onClick={handleClick}
            id="empleo"
          >
            Ofertas Laborales
          </li>
          <li
            className={
              activeSection === "boom"
                ? `${styles.active} category`
                : "category"
            }
            onClick={handleClick}
            id="boom"
          >
            Booms
          </li>
          {/*
          <li
            className={
              activeSection === "servicio"
                ? `${styles.active} category`
                : "category"
            }
            onClick={handleClick}
            id="servicio"
          >
            Servicios
          </li>
          */}
          <li
            className={
              activeSection === "pregunta"
                ? `${styles.active} category`
                : "category"
            }
            onClick={handleClick}
            id="pregunta"
          >
            Preguntas Frecuentes
          </li>

          {/*  <li
            className={
              activeSection.recurso ? `${styles.active} category` : "category"
            }
            onClick={handleClick}
            id="recurso"
          >
            Recursos
          </li>
          <li
            className={
              activeSection.curso ? `${styles.active} category` : "category"
            }
            onClick={handleClick}
            id="curso"
          >
            Cursos Gratuitos
          </li> */}
        </ul>
      </nav>
      <div className={styles.aside_tags_popular}>
        <h2>Tags Populares</h2>
        <nav className={styles.aside_tags_enlaces}>
          <ul>
            {tags.length
              ? tags.map((e) => {
                  return (
                    <li className="tags" onClick={handleClick} title={e[0]}>
                      {e[0]}
                    </li>
                  );
                })
              : null}
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
