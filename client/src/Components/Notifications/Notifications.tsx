import styles from "./Notifications.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "../Notification/Notification";
import useNotifications from "../../Hooks/useNotifications";
import { INotification } from "../../../../src/models/User";
type Props = {
  open: boolean;
};

export default function Notifications({ open }: Props) {
  const notifications = useNotifications();
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

  return (
    <AnimatePresence>
      open &&{" "}
      <motion.div
        variants={variants}
        initial={"close"}
        animate={open ? "open" : "close"}
        className={styles.container}
      >
        {notifications?.map((e: INotification, i) => {
          return <Notification detail={e} key={i} id={i}></Notification>;
        })}
      </motion.div>
    </AnimatePresence>
  );
}
