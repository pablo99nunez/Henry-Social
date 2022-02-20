import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import { getPosts } from "../../redux/actions/actions";
import { BsPlusCircleFill } from "react-icons/bs";

import styles from "./Posts.module.scss";
import Post from "../Post/Post";
import AddPost from "../ModalAddPost/AddPost";
import Modal from "../Modal/Modal";
const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: IState) => state.posts);
    const [order, setOrder] = useState("Relevante");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getPosts());
    }, []);
    return (
        <div className={styles.posts_wrap}>
            <div className={styles.header}>
                <div className={styles.orders}>
                    <h2
                        className={order === "Relevante" ? styles.active : ""}
                        onClick={() => setOrder("Relevante")}
                    >
                        Relevante
                    </h2>
                    <h2>|</h2>
                    <h2
                        className={order === "Seguidos" ? styles.active : ""}
                        onClick={() => setOrder("Seguidos")}
                    >
                        Seguidos
                    </h2>
                </div>
                <BsPlusCircleFill onClick={() => setShowModal(true)} />
                <Modal
                    title="Crea una publicacion"
                    isOpen={showModal}
                    setIsOpen={setShowModal}
                >
                    <AddPost setOpen={setShowModal} />
                </Modal>
            </div>
            <div className={styles.posts}>
                {posts?.map((e) => (
                    <Post post={e} key={e._id}></Post>
                ))}
            </div>
        </div>
    );
};

export default Posts;
