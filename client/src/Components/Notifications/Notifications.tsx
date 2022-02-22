import styles from "./Notifications.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "../Notification/Notification";
type Props = {
  open: boolean;
};

export default function Notifications({ open }: Props) {
  const variants = {
    open: {
      scale: 1,
      originX: "2rem",
      originY: 0,
      opacity: 1,
    },
    close: {
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
        <Notification></Notification>
        <Notification></Notification>
        <Notification></Notification>
        <Notification></Notification>
      </motion.div>
    </AnimatePresence>
  );
}
