import React, { useRef } from "react";
import styles from "./Modal.module.scss";

export default function Modal({
    children,
    title = "Modal",
    isOpen = true,
    setIsOpen,
}: any) {
    const modal = useRef<HTMLDivElement>(null);
    return (
        isOpen && (
            <div
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
            </div>
        )
    );
}
