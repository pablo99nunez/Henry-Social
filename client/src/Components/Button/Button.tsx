import React from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";

export default function Button({
    children,
    onClick,
    active,
    style,
    className,
}: any) {
    const variants = {
        active: { backgroundColor: "#ff1", color: "#000" },
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
            style={style}
            className={styles.button}
        >
            {children}
        </motion.button>
    );
}
