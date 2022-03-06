import styles from "../ListSearch/ListSearch.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { IUser } from "../../../../src/models/User";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import { IState } from "../../redux/reducer";
import { useNavigate } from "react-router";
export default function ListSearch() {
  const variants = {
    open: {
      scale: 1,
      rotateZ: 0,
      originX: "2rem",
      originY: 0,
      opacity: 1,
    },
    close: {
      rotateZ: -45,
      originX: "2rem",
      originY: 0,
      scale: 0,
      opacity: 0,
    },
  };
  const users = useSelector((state: IState) => state.Users);
  const navigate = useNavigate();
  return (
    <div>
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial={"close"}
          animate={"open"}
          className={styles.container}
        >
          {users &&
            (users.length ? (
              users.map((e: IUser) => {
                return (
                  <div
                    className={`${styles.notification}`}
                    onClick={() => navigate("/profile/" + e.username)}
                  >
                    <Avatar avatar={e.avatar} />
                    <div>
                      <h3>{e.name}</h3>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className={styles.noNotification}>Buscando</h3>
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
