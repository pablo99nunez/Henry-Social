import React from "react";
import styles from "./SideTags.module.scss";
import { HiLink } from "react-icons/hi";
const SideTags = () => {
    return (
        <aside className={styles.aside_tags}>
            <div className={styles.aside_sections}>
                <h2>Secciones</h2>
                <ul>
                    <li><a href="#">Ofertas laborales</a></li>
                    <li><a href="#">Booms</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Preguntas frecuentes</a></li>
                    <li><a href="#">Recursos</a></li>
                    <li><a href="#">Cursos gratuitos</a></li>
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
                    <a href="#"> <HiLink/> Henry Talent</a>
                    <a href="#"> <HiLink/> Henry Student</a>
                    <a href="#"> <HiLink/> Henry Calendary</a>
                </div>
            </div>

        </aside>
    )
}

export default SideTags;