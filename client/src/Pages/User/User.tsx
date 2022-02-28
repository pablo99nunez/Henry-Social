import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FollowBar from "../../Components/FollowBar/FollowBar";
import Chat from "../../Components/Chat/Chat";
import Post from "../../Components/Post/Post";
import style from "./User.module.scss";
import linkedin from "../../assets/icons/linkedin2.png";
import github from "../../assets/icons/github2.png";
import coffee from "../../assets/icons/coffee-cup3.png";
import NavSearch from "../../Components/NavSearch/NavSearch";
import Button from "../../Components/Button/Button";
import Settings from "../../Components/Settings/Settings";
import useUser from "../../Hooks/useUser";
import Modal from "../../Components/Modal/Modal";
import {
  clear,
  filterByLike,
  followUser,
  getPosts,
  makeAdmin,
} from "../../redux/actions/actions";
import { useProfile } from "../../Hooks/useProfile";
import { IState } from "../../redux/reducer";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

export default function User() {
  const [edit, setEdit] = useState(false);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(1);
  const [user, isOwner] = useProfile(username);
  const [isFollowing, setIsFollowing] = useState(false);
  const posts = useSelector((state: IState) => state.posts);
  const userLogeado = useUser();
  const dispatch = useDispatch();

  function handleFollow() {
    if (userLogeado?.username && user?.username && userLogeado.following) {
      dispatch(followUser(userLogeado.username, user.username));
      setIsFollowing(!isFollowing);
    }
  }
  function handleAdmin() {
    if (username) dispatch(makeAdmin(username));
  }
  useEffect(() => {
    return () => {
      dispatch(clear("profile"));
    };
  }, []);
  useEffect(() => {
    if (userLogeado?.following && user?.username) {
      setIsFollowing(userLogeado.following.includes(user.username));
    }
  }, [username, userLogeado, user]);
  useEffect(() => {
    if (user) {
      dispatch(getPosts(user._id));
      setLoading(false);
    }
  }, [user]);

  const editProfile = (e: any) => {
    return setEdit(true);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <NavSearch></NavSearch>
      <Modal isOpen={edit} setIsOpen={setEdit} title="Editar Perfil">
        <Settings
          cancel={(e: any) => {
            e.preventDefault();
            return setEdit(false);
          }}
        />
      </Modal>

      <div className={style.User}>
        <div className={style.head_profile}>
          <div className={style.head_profile_central}>
            <div className={style.photo}>
              <img
                src={
                  typeof user?.avatar == "string"
                    ? user?.avatar
                    : "https://s5.postimg.cc/537jajaxj/default.png"
                }
                alt=""
              />
            </div>
            <div className={style.details}>
              <div className={style.buttons}>
                {userLogeado?.master ? (
                  <Button onClick={handleAdmin}>
                    {user?.admin ? "Eliminar rol de Admin" : "Hacer Admin"}
                  </Button>
                ) : null}
                {isOwner ? (
                  <Button onClick={editProfile}>Editar Perfil</Button>
                ) : (
                  <>
                    <Button>
                      Invitame un cafe
                      <img src={coffee} alt="coffee-logo" />
                    </Button>
                    <Button onClick={handleFollow} active={isFollowing}>
                      {isFollowing ? "Siguiendo" : "Seguir"}
                    </Button>
                  </>
                )}
              </div>
              <div className={style.userInfo}>
                <h1>{user?.name}</h1>
                <h2 style={{ color: "#aaa" }}>
                  {user?.role + (user?.cohorte ? " | " + user?.cohorte : "")}
                </h2>
                <div className={style.bio}>
                  <h3>{user?.bio}</h3>
                </div>
              </div>

              <div className={style.details_bottom}>
                <div>
                  <div>
                    <h3>{user?.following?.length}</h3>
                    <h3>Seguidos</h3>
                  </div>
                  <div>
                    <h3>{user?.followers?.length}</h3>
                    <h3>Seguidores</h3>
                  </div>
                </div>

                <div>
                  {user?.linkedin ? (
                    <a
                      href={`https://www.linkedin.com/in/${user.linkedin}`}
                      target="_blank"
                    >
                      <div>
                        <img
                          src={linkedin}
                          alt="linkedin-profile"
                          className={style.linkedin_logo}
                        />
                      </div>
                    </a>
                  ) : (
                    <div>
                      <img
                        src={linkedin}
                        alt="linkedin-profile"
                        className={style.linkedin_logo}
                      />
                    </div>
                  )}
                  {user?.github ? (
                    <a
                      href={`https://www.github.com/${user.github}`}
                      target="_blank"
                    >
                      <div>
                        <img
                          src={github}
                          alt="github-logo"
                          className={style.github_logo}
                        />
                      </div>
                    </a>
                  ) : (
                    <div>
                      <img
                        src={github}
                        alt="github-logo"
                        className={style.github_logo}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={style.body_profile}>
            <div className={style.follow_bar}>
              <FollowBar />
            </div>
            <div className={style.posts}>
              <div className={style.filters}>
                <h3
                  className={filter == 1 ? style.active : ""}
                  onClick={() => {
                    dispatch(getPosts(user._id));
                    setFilter(1);
                  }}
                >
                  Publicaciones
                </h3>
                <h3>|</h3>
                <h3
                  className={filter == 2 ? style.active : ""}
                  onClick={() => {
                    if (user._id) {
                      dispatch(filterByLike(user._id));
                      setFilter(2);
                    }
                  }}
                >
                  Me gusta
                </h3>
              </div>
              {posts?.map((e, i) => (
                <Post post={e} key={i}></Post>
              ))}
            </div>
            <div className={style.mistery_box}>{"Misterious NavBar"}</div>
          </div>
          <Chat />
        </div>
      </div>
    </>
  );
}
