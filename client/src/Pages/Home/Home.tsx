import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import style from "./Home.module.scss";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideTags from "../../Components/SideTags/SideTags";
import Posts from "../../Components/Posts/Posts";
import SideMessages from "../../Components/SideMessages/SideMessages";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

import useUser from "../../Hooks/useUser";
import { getPosts } from "../../redux/actions/actions";
import Present from "../../Components/Present/Present";
import Chats from "../../Components/Chats/Chats";
import useLogin from "../../Hooks/useLogin";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useLogin();
  const user = useUser();
  useEffect(() => {
    if (user?.username) {
      setLoading(false);
    }
  });
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className={style.home}>
          <Helmet>
            <meta charSet="utf-8"/>
            <meta name="Página Principal" content="Application"/>
            <title>Home | Henry Social</title>
          </Helmet>
          <NavSearch/>
          <div className={style.home_position}>
            <div className={style.aside}>
              <SideTags />
            </div>
            <Posts />
            <div className={style.aside}>
              <SideMessages />
              <Present></Present>
            </div>
          </div>
          <Chats></Chats>
        </div>
      )}
    </>
  );
};

export default Home;
