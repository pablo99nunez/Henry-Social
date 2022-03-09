import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Button/Button";
import Post from "../../../Components/Post/Post";
import { getPosts } from "../../../redux/actions/actions";
import { IState } from "../../../redux/reducer";
import style from "./Denuncias.module.scss";

export default function Denuncias() {
  const posts = useSelector((state: IState) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    console.log(
      posts
        ?.filter((e) => e.reportedTimes > 0)
        .sort((a, b) => (a.reportedTimes > b.reportedTimes ? 1 : -1))
    );
  }, []);
  return (
    <div className={style.denuncias}>
      <h1>Publicaciones Denunciadas</h1>
      {posts
        ?.filter((e) => e.reportedTimes > 0)
        .sort((a, b) => (a.reportedTimes > b.reportedTimes ? 1 : -1))
        .map((e) => {
          return (
            <div className={style.post}>
              <Post post={e}></Post>
              <div className={style.options}>
                <h3>Numero de reportes: {e.reportedTimes}</h3>
                <Button>Eliminar publicacion</Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
