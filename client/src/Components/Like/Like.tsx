import React, { useEffect, useRef, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import style from "./Like.module.scss";

export default function Like() {
  let icon = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState<Boolean>();
  const [like, setLike] = useState<Boolean>();

  const variants = {
    liked: { scale: [1, 1.1, 1], rotateZ: [0, 30, -30, 0] },
    disliked: { scale: [1.1, 1] },
  };

  return (
    <div className={style.like}>
      <motion.div
        variants={variants}
        animate={like ? "liked" : "disliked"}
        transition={{
          duration: 0.3,
        }}
        className={style.heart}
        ref={icon}
        onClick={() => {
          setLike(!like);
        }}
      >
        {like ? <BsHeartFill /> : <BsHeart></BsHeart>}
      </motion.div>
      <p>45</p>
    </div>
  );
}
