import React from "react";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideTags from "../../Components/SideTags/SideTags";
import Posts from "../../Components/Posts/Posts";
import SideMessages from "../../Components/SideMessages/SideMessages";
import Chat from "../../Components/Chat/Chat";
import style from "./Home.module.scss";

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