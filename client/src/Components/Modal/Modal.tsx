import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import styles from "./Modal.module.scss";

export default function Modal({
    children,
    title = "Modal",
    isOpen = true,
    setIsOpen,
}: any) {
    const modal = useRef<HTMLDivElement>(null);
    const variants = {
        initial: {
            x: -3000,
        },
        open: {
            x: 0,
        },
        close: {
            x: 3000,
        },
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={variants}
                    initial={"initial"}
                    animate={"open"}
                    exit={"close"}
                    transition={{}}
                    className={styles.Modal_wrap}
                    onClick={(e) => {
                        if (e.target == modal.current) {
                            setIsOpen(false);
                        }
                    }}
                    ref={modal}
                >
                    <div className={styles.Modal}>
                        <h1>{title}</h1>
                        <div className={styles.content}>{children}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
