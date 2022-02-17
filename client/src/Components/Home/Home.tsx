import React from "react";
import NavSearch from "../NavSearch/NavSearch";
import SideTags from "../SideTags/SideTags";
import Posts from "../Posts/Posts";
import SideMessages from "../SideMessages/SideMessages";
import Chat from "../Chat/Chat";
import style from "./Home.module.scss"

const Home = () => {
    return (
        <div className={style.home}>
            <NavSearch/>
            <div className={style.home_position}>
                <SideTags/>
                <Posts/>
                <SideMessages/>
            </div>
            <Chat/>
        </div>
    )
} 

export default Home;