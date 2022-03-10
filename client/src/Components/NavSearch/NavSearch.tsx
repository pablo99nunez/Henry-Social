import styles from "./NavSearch.module.scss";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../Hooks/useUser";
import { closeSession } from "../../../src/firebase/login-methods";
import { searchUsers, signOut } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import { RiAdminFill } from "react-icons/ri";
import { useState } from "react";
import Notifications from "../Notifications/Notifications";
import ListSearch from "../ListSearch/ListSearch";
import { IState } from "../../redux/reducer";
import Avatar from "../Avatar/Avatar";
const NavSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUser();

  const handleSignOut = async () => {
    await closeSession()
      .then(() => {
        dispatch(signOut());
        InfoAlert.fire("Has cerrado sesión");
      })
      .catch((e) =>
        InfoAlert.fire({
          title: "No pudiste cerrar sesión" + e.message,
          icon: "error",
        })
      );

    navigate("/login");
  };
  const users = useSelector((state: IState) => state.Users);
  const [input, setInput] = useState("");
  const handleSearch = (e: any) => {
    setInput(e.target.value);
    dispatch(searchUsers(e.target.value));
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_wrap}>
        <div
          className={styles.nav_logo}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://assets.soyhenry.com/assets/LOGO-HENRY-03.png"
            alt="logo henry"
          />
          <h1> | Social</h1>
        </div>
        <div className={styles.nav_search}>
          <input
            onChange={(e) => {
              handleSearch(e);
            }}
            type="search"
            name="input"
            value={input}
            placeholder="Busca otros Henry's "
            autoComplete="off"
          />
          {!input ? null : users.length === 0 ? "" : <ListSearch />}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
          className={styles.notifications}
        >
          {(user?.admin || user?.master) && (
            <RiAdminFill
              size={"2rem"}
              color="#fff"
              cursor={"pointer"}
              onClick={() => navigate("/admin")}
            />
          )}
          <Notifications />

          <div
            className={styles.nav_button_profile}
            onClick={() => {
              navigate("/profile/" + user?.username);
            }}
          >
            <Avatar
              avatar={
                typeof user?.avatar === "string"
                  ? user?.avatar
                  : "https://s5.postimg.cc/537jajaxj/default.png"
              }
            />
            <div className={styles.nav_profile_info}>
              <h3>
                <strong>{user?.name}</strong>
              </h3>

              <p>
                {user?.role} - <strong>{user?.cohorte || "FT-20B"}</strong>
              </p>
            </div>
          </div>
          <FaSignOutAlt
            style={{
              color: "#ff1",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={handleSignOut}
          />
        </div>
      </div>
    </nav>
  );
};
export default NavSearch;
