import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { IPost } from "../../../../../src/models/Post";
import style from "./Image.module.scss";
import { BsX } from "react-icons/bs";

type Props = {
  post: IPost;
};

export default function Image({ post }: Props) {
  const [view, setView] = useState(false);
  const img = useRef(null);

  const variants = {
    initial: {
      scale: 1,
    },
    active: {},
  };

  return post.image ? (
    <motion.div
      className={`${style.imgContainer} ${view && style.active}`}
      onClick={(e) => {
        if (e.target !== img.current) setView(false);
      }}
    >
      {view && <p>Clickea fuera de la imagen para cerrar</p>}
      {view && <BsX onClick={() => setView(false)}></BsX>}
      <motion.img
        variants={variants}
        ref={img}
        whileHover={!view ? { scale: 1.1 } : { scale: 1 }}
        initial={"initial"}
        animate={view ? "active" : "initial"}
        onClick={() => setView(true)}
        src={post.image}
      ></motion.img>
    </motion.div>
  ) : null;
}
