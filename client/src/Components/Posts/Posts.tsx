import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import { filterByOrder, getPosts } from "../../redux/actions/actions";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";

import styles from "./Posts.module.scss";
import Post from "../Post/Post";
import AddPost from "../ModalAddPost/AddPost";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
import useUser from "../../Hooks/useUser";
const Posts = () => {
  const dispatch = useDispatch();
  const {
    results: posts,
    filter,
    socket,
  } = useSelector((state: IState) => state);
  const user = useUser();
  const [order, setOrder] = useState("Reciente");
  const [showModal, setShowModal] = useState(false);
  const [newPosts, setNewPosts] = useState(false);
  const [edit, setEdit] = useState(false);
  const plusVariants = {
    normal: { scale: 1 },
    active: { scale: 50, rotateZ: 180, x: 200, zIndex: 5000 },
  };

  const postsVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const postVariants = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    socket?.on("receive_posts", () => {
      setNewPosts(true);
    });
  }, [socket]);

  useEffect(() => {
    dispatch(filterByOrder(order));
  }, [order]);

  return (
    <div className={styles.posts_wrap}>
      <div className={styles.header}>
        <div className={styles.orders}>
          <h2
            className={order === "Reciente" ? styles.active : ""}
            onClick={() => setOrder("Reciente")}
          >
            Reciente
          </h2>
          <h2>|</h2>
          <h2
            className={order === "Relevante" ? styles.active : ""}
            onClick={() => setOrder("Relevante")}
          >
            Relevante
          </h2>
          {filter === "pregunta" && user?.role !== "Estudiante" && (
            <>
              <h2>|</h2>
              <h2
                className={order === "Pendientes" ? styles.active : ""}
                onClick={() => setOrder("Pendientes")}
              >
                Pendientes
              </h2>
            </>
          )}
        </div>
        <motion.div
          variants={plusVariants}
          className={styles.addLogo}
          animate={showModal ? "active" : "normal"}
          transition={{
            type: "tween",
          }}
        >
          <BsPlusCircleFill onClick={() => setShowModal(true)} />
        </motion.div>

        <Modal
          title={`${edit ? "Editar" : "Crea una"} publicacion`}
          isOpen={showModal}
          setIsOpen={setShowModal}
        >
          <AddPost setOpen={setShowModal} edit={edit} setEdit={setEdit} />
        </Modal>
      </div>
      {newPosts && (
        <div
          className={styles.newPosts}
          onClick={() => {
            dispatch(getPosts());
            setNewPosts(false);
          }}
        >
          <h3>Hay nuevos posts esperandote!</h3>
          <AiOutlineReload></AiOutlineReload>
        </div>
      )}
      <motion.div
        className={styles.posts}
        variants={postsVariants}
        initial="hidden"
        animate="show"
      >
        {posts?.map((e) => (
          <motion.div key={e._id} variants={postVariants}>
            <Post post={e} setEdit={setEdit} setShowModal={setShowModal} />
          </motion.div>
        ))}
      </motion.div>
      {!posts?.length && <h2 className={styles.noPosts}>Nada que ver aqui.</h2>}
    </div>
  );
};
export default Posts;
