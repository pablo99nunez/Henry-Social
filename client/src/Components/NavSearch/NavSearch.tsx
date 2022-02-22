import styles from "./NavSearch.module.scss";
import { BsBellFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import useUser from "../../Hooks/useUser";
import { closeSession } from "../../../../src/services/firebase/login-methods";
import Button from "../Button/Button";
import { signOut } from "../../redux/actions/actions";
const NavSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUser();

  const handleSignOut = async () => {
    await closeSession()
      .then(() => {
        dispatch(signOut());
        alert("Has cerrado sesion");
      })
      .catch((e: any) => alert("No pudiste cerrar sesion" + e.message));

    navigate("/login");
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
          <input type="search" placeholder="Busca otros Henry's " />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            <BsBellFill className={styles.nav_icon_notification} />
          </div>
          <div
            className={styles.nav_button_profile}
            onClick={() => {
              navigate("/profile/" + user?.username);
            }}
          >
            <img
              src={
                typeof user?.avatar == "string"
                  ? user?.avatar
                  : "https://s5.postimg.cc/537jajaxj/default.png"
              }
              alt=""
            />
            <div className={styles.nav_profile_info}>
              <h3>
                <strong>{user?.name}</strong>
              </h3>

              <p>
                Student - <strong>{user?.cohorte || "FT-20B"}</strong>
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
          ></FaSignOutAlt>
        </div>
      </div>
    </nav>
  );
};
export default NavSearch;
