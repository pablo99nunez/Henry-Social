import styles from "./Notifications.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "../Notification/Notification";
import useNotifications from "../../Hooks/useNotifications";
import { INotification } from "../../../../src/models/User";
import { BsBellFill } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, news] = useNotifications();
  const container = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    if (container.current) container.current.scrollTop = -50000;
  }, [container]);

  return (
    <div>
      <div className={styles.icon_wrap}>
        <BsBellFill className={styles.icon} onClick={() => setOpen(!open)} />
        {news && <div className={styles.news}></div>}
      </div>
      <AnimatePresence>
        open &&{" "}
        <motion.div
          variants={variants}
          initial={"close"}
          animate={open ? "open" : "close"}
          className={styles.container}
          ref={container}
        >
          {typeof notifications !== "boolean" &&
            notifications &&
            (notifications.length ? (
              notifications.map((e: INotification, i: number) => {
                return <Notification detail={e} key={i} id={i}></Notification>;
              })
            ) : (
              <h3 className={styles.noNotification}>No hay notificaciones</h3>
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
