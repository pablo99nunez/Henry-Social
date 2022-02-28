import { useEffect, useState } from "react";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideTags from "../../Components/SideTags/SideTags";
import Posts from "../../Components/Posts/Posts";
import SideMessages from "../../Components/SideMessages/SideMessages";
import Chat from "../../Components/Chat/Chat";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

import style from "./Home.module.scss";
import useUser from "../../Hooks/useUser";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/actions";
import Present from "../../Components/Present/Present";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
          <NavSearch />
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
          <Chat />
        </div>
      )}
    </>
  );
};

export default Home;
