import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FollowBar from "../../Components/followBar/FollowBar";
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
import { followUser, getProfile } from "../../redux/actions/actions";
import { useProfile } from "../../Hooks/useProfile";

interface Params {
    param: string;
}

export default function User() {
    const [edit, setEdit] = useState(false);
    const { username } = useParams();
    const [loading, setLoading] = useState(false);

    const [user, isOwner] = useProfile(username);
    const [isFollowing, setIsFollowing] = useState(false);

    let userLogeado = useUser();
    let dispatch = useDispatch();

    function handleFollow() {
        if (userLogeado?.username && user?.username && userLogeado.following) {
            dispatch(followUser(userLogeado.username, user.username));
            setIsFollowing(!isFollowing);
        }
    }
    useEffect(() => {
        if (userLogeado?.following && user?.username)
            setIsFollowing(userLogeado.following.includes(user.username));
    }, [username, userLogeado]);
    useEffect(() => {
        // if (username) dispatch(getProfile(username));
    }, [isFollowing]);

    const editProfile = () => {
        return setEdit(true);
    };

    return (
        !loading && (
            <>
                <NavSearch></NavSearch>
                <Modal isOpen={edit} setIsOpen={setEdit}>
                    <Settings cancel={() => setEdit(false)}></Settings>
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
                                    {userLogeado?.admin ? (
                                        <Button>
                                            {user?.admin
                                                ? "Eliminar rol de Admin"
                                                : "Hacer Admin"}
                                        </Button>
                                    ) : null}
                                    {isOwner ? (
                                        <Button onClick={editProfile}>
                                            Editar Perfil
                                        </Button>
                                    ) : (
                                        <div className={style.buttons}>
                                            <Button>
                                                Invitame un cafe
                                                <img
                                                    src={coffee}
                                                    alt="coffee-logo"
                                                />
                                            </Button>
                                            <Button
                                                onClick={handleFollow}
                                                active={isFollowing}
                                            >
                                                {isFollowing
                                                    ? "Siguiendo"
                                                    : "Seguir"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className={style.userInfo}>
                                    <h1>{user?.name}</h1>
                                    <h2 style={{ color: "#aaa" }}>
                                        {user?.role +
                                            (user?.cohorte
                                                ? " | " + user?.cohorte
                                                : "")}
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
                                            >
                                                <div>
                                                    <img
                                                        src={linkedin}
                                                        alt="linkedin-profile"
                                                        className={
                                                            style.linkedin_logo
                                                        }
                                                    />
                                                </div>
                                            </a>
                                        ) : (
                                            <div>
                                                <img
                                                    src={linkedin}
                                                    alt="linkedin-profile"
                                                    className={
                                                        style.linkedin_logo
                                                    }
                                                />
                                            </div>
                                        )}
                                        {user?.github ? (
                                            <a
                                                href={`https://www.github.com/${user.github}`}
                                            >
                                                <div>
                                                    <img
                                                        src={github}
                                                        alt="github-logo"
                                                        className={
                                                            style.github_logo
                                                        }
                                                    />
                                                </div>
                                            </a>
                                        ) : (
                                            <div>
                                                <img
                                                    src={github}
                                                    alt="github-logo"
                                                    className={
                                                        style.github_logo
                                                    }
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
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                            </div>
                            <div className={style.mistery_box}>
                                {"Misterious NavBar"}
                            </div>
                        </div>
                        <Chat />
                    </div>
                </div>
            </>
        )
    );
}

/* 
Datos que tengo que recibir en este componente: ===> Crear unos componentes de ejemplo

- Si el usuario logueado es el propietario de este perfil o no

- Nombre, numero de cohorte, foto, email 

- Num de seguidores/seguidos 

- Link de Linkedin y Github

- Arreglo con los usuarios a los que sigue

- Arreglo con las publicaciones hechas ==> Ver si tratar esto en un componente aparte o no


*/
