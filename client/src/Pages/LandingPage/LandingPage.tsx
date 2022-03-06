import React from "react";
import NavSearch from "../../Components/NavSearch/NavSearch";
import style from './LandingPage.module.scss'

export default function LandingPage(){

    return(
        <div>
            <NavSearch />
            <div>
                <header>
                    <div id={style.title_cont}>
                        <img
                            src="https://assets.soyhenry.com/assets/LOGO-HENRY-03.png"
                            alt="icon"
                        />
                        <h1> | Social </h1>
                    </div>
                    <button className={style.act_btn}>

                    </button>
                </header>
            </div>
            <div>
                
            </div>
        </div>
    )
}