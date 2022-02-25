import { useEffect, useState } from "react";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideTags from "../../Components/SideTags/SideTags";
import Posts from "../../Components/Posts/Posts";
import SideMessages from "../../Components/SideMessages/SideMessages";
import Chat from "../../Components/Chat/Chat";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

import style from "./Home.module.scss";
import useUser from "../../Hooks/useUser";

const Home = () => {
  const [ loading, setLoading ] = useState(true);
  
  const user = useUser();
  useEffect(() => {
    if (user?.username) {
      setLoading(false);
    }
  });
  return (
      <>
        {
          loading ? <LoadingPage/>
          : <div className={style.home}>
              <NavSearch />
              <div className={style.home_position}>
                <SideTags />
                <Posts />
                <SideMessages />
              </div>
              <Chat />
            </div>
        }
      </>
  );
};

export default Home;
