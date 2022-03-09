import styles from "./CommentModal.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import useUser from "../../Hooks/useUser";
import { getPost, getPosts } from "../../redux/actions/actions";

export default function CommentModal({ open, postId }: any) {
  const [comment, setComment] = useState("");
  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variants = {
    close: {
      y: -110,
      originY: "top-center",
      zIndex: -2,
    },
    open: {
      y: 0,
      originY: "top-center",
      zIndex: 0,
    },
  };
  async function sendComment() {
    if (user)
      await axios
        .post("/comment", { postId, text: comment, author: user._id })
        .then(() => {
          setComment("");
          navigate("/post/" + postId);
        });
    if (window.location.pathname == "/post/" + postId)
      dispatch(getPost(postId));
    else dispatch(getPosts());
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.comment}
          variants={variants}
          initial="close"
          animate={"open"}
          exit="close"
        >
          <input
            type="text"
            placeholder="Agregar comentario..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <IoSend onClick={sendComment}></IoSend>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
