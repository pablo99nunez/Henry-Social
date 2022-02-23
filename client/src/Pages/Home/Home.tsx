import React, { useEffect } from "react";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideTags from "../../Components/SideTags/SideTags";
import Posts from "../../Components/Posts/Posts";
import SideMessages from "../../Components/SideMessages/SideMessages";
import Chat from "../../Components/Chat/Chat";
import { auth } from "../../../../src/services/firebase/firebase";
import { useNavigate } from "react-router";

import style from "./Home.module.scss";
import useUser from "../../Hooks/useUser";
import { InfoAlert } from "../../Components/Alert/Alert";

const Home = () => {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
  });
  return (
    <div className={style.home}>
      <NavSearch />
      <div className={style.home_position}>
        <SideTags />
        <Posts />
        <SideMessages />
      </div>
      <Chat />
    </div>
  );
};

export default Home;
