import React from "react";
import styles from "./NavSearch.module.scss";
import { BsBellFill } from "react-icons/bs";
const NavSearch = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav_logo}>
                <img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="logo henry" />
            </div>
            <div className={styles.nav_search}>
                <input type="search" placeholder="Busca otros Henry's " />
            </div>
            <div className={styles.nav_button_profile}>
                <div >
                    <BsBellFill className={styles.nav_icon_notification}/>
                </div>
                <div className={styles.nav_profile_img}>
                </div>
                <div className={styles.nav_profile_info}>
                    <p>Sofia Praderio</p>
                    <p><span>Student</span> - FT-20B</p>
                </div>
            </div>
        </nav>
    )
}
export default NavSearch;