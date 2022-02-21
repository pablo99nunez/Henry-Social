import React from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";

export default function Button({
    children,
    onClick,
    active,
    style,
    color = "inherit",
    className,
}: any) {
    const variants = {
        active: {
            backgroundColor: color === "#ff1" ? "#001" : "#ff1",
            color: color === "#ff1" ? "#ff1" : "#000",
        },
    };
    return (
        <motion.button
            variants={variants}
            animate={active ? "active" : ""}
            onClick={onClick}
            whileHover={{
                scale: 1.1,
            }}
            whileTap={{
                scale: 1.07,
            }}
            transition={{
                duration: 0.3,
                type: "tween",
            }}
            style={style}
            className={styles.button}
        >
            {children}
        </motion.button>
    );
}
