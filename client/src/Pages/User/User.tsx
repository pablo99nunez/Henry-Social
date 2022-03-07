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
import portafolioIcon from "../../assets/icons/portafolio.png";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideMessages from "../../Components/SideMessages/SideMessages";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ConfirmAlert,
  ErrorAlert,
  InfoAlert,
} from "../../Components/Alert/Alert";
import Chats from "../../Components/Chats/Chats";

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
  const navigate = useNavigate();

  function handleFollow() {
    if (userLogeado?.username && user?.username && userLogeado.following) {
      dispatch(followUser(userLogeado.username, user.username));
      setIsFollowing(!isFollowing);
    }
  }
  function handleAdmin() {
    if (username) dispatch(makeAdmin(username));
  }
  async function handleDeleteUser(userId: string, adminId: string) {
    try {
      ConfirmAlert.fire("¿Estas seguro que deseas eliminar el usuario?").then(
        async (res) => {
          if (res.isConfirmed) {
            await axios.delete("/delete-user", {
              data: {
                userId,
                adminId,
              },
            });
            navigate("/");
            InfoAlert.fire("Has eliminado a " + user?.name);
          }
        }
      );
    } catch (e) {
      ErrorAlert.fire("Error" + e);
    }
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
      document.title = `${user?.name} | Henry Social`;
    }
  }, [user]);

  const editProfile = (e: any) => {
    return setEdit(true);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <Modal isOpen={edit} setIsOpen={setEdit} title="Editar Perfil">
        <Settings
          cancel={(e?: any) => {
            e && e.preventDefault();
            return setEdit(false);
          }}
        />
      </Modal>

      <div className={style.User}>
        <NavSearch></NavSearch>
        <div className={style.head_profile}>
          <div className={style.head_profile_central}>
            <div className={style.photo}>
              <img
                src={
                  isOwner
                    ? typeof userLogeado?.avatar == "string" &&
                      userLogeado?.avatar
                      ? userLogeado?.avatar
                      : "https://s5.postimg.cc/537jajaxj/default.png"
                    : typeof user?.avatar == "string" && user?.avatar
                    ? user?.avatar
                    : "https://s5.postimg.cc/537jajaxj/default.png"
                }
                alt=""
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={style.details}>
              <div className={style.buttons}>
                {userLogeado?.admin ? (
                  <>
                    <Button onClick={handleAdmin}>
                      {user?.admin ? "Eliminar rol de Admin" : "Hacer Admin"}
                    </Button>
                    <Button
                      onClick={() => {
                        if (user?._id && userLogeado?._id) {
                          handleDeleteUser(user._id, userLogeado._id);
                        }
                      }}
                    >
                      Delete user
                    </Button>
                  </>
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
                  {isOwner && userLogeado?.linkedin ? (
                    <a href={userLogeado?.linkedin} target="_blank">
                      <div>
                        <img
                          src={linkedin}
                          alt="linkedin-profile"
                          className={style.linkedin_logo}
                        />
                      </div>
                    </a>
                  ) : user?.linkedin ? (
                    <a href={user?.linkedin} target="_blank">
                      <div>
                        <img src={linkedin} alt="linkedin-profile" />
                      </div>
                    </a>
                  ) : (
                    <div> </div>
                  )}
                  {isOwner && userLogeado?.github ? (
                    <a
                      href={`https://www.github.com/${userLogeado?.github}`}
                      target="_blank"
                    >
                      <div>
                        <img src={github} alt="github-logo" />
                      </div>
                    </a>
                  ) : user?.github ? (
                    <a
                      href={`https://www.github.com/${user?.github}`}
                      target="_blank"
                    >
                      <div>
                        <img src={github} alt="github-logo" />
                      </div>
                    </a>
                  ) : (
                    <div> </div>
                  )}
                  {isOwner && userLogeado?.portfolio ? (
                    <a href={userLogeado?.portfolio} target="_blank">
                      <div>
                        <img
                          src={github}
                          alt="portfolio-logo"
                          className={style.github_logo}
                        />
                      </div>
                    </a>
                  ) : user?.portfolio ? (
                    <a href={user?.portfolio} target="_blank">
                      <div>
                        <img
                          src={github}
                          alt="portfolio-logo"
                          className={style.github_logo}
                        />
                      </div>
                    </a>
                  ) : (
                    <div> </div>
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
                  className={filter === 1 ? style.active : ""}
                  onClick={() => {
                    if (user?._id) {
                      dispatch(getPosts(user._id));
                      setFilter(1);
                    }
                  }}
                >
                  Publicaciones
                </h3>
                <h3>|</h3>
                <h3
                  className={filter === 2 ? style.active : ""}
                  onClick={() => {
                    if (user?._id) {
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
            <div className={style.mistery_box}>
              <SideMessages />
            </div>
          </div>
        </div>
        <Chats></Chats>
      </div>
    </>
  );
}
