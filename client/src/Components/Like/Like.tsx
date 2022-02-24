import React, { useEffect, useRef, useState, FC } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import style from "./Like.module.scss";
import { IPost } from "../../../../src/models/Post";
import { useDispatch } from "react-redux";
import { likePost } from "../../redux/actions/actions";
import useUser from "../../Hooks/useUser";
import axios from "axios";

type Props = {
  post: IPost;
};

export const Like: FC<Props> = ({ post }) => {
  const icon = useRef<HTMLDivElement>(null);
  const [like, setLike] = useState<boolean>(false);
  const [sum, setSum] = useState(true);
  const user = useUser();
  const handleLike = () => {
    if (user) {
      setLike(!like);

      axios.post("/like", {
        _id: post._id,
        author: user,
      });
    }
  };
  useEffect(() => {
    if (user?._id && post) {
      const isLiked = post?.nLikes?.includes(user._id);
      if (isLiked) setSum(false);
      setLike(isLiked);
    }
  }, [user, post]);

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
          handleLike();
        }}
      >
        {like ? <BsHeartFill /> : <BsHeart></BsHeart>}
      </motion.div>
      <p>{post?.nLikes?.length + (like ? (sum ? 1 : 0) : sum ? 0 : -1)}</p>
      {
        //     0              ---- true && true =        1
        //      1              ---- true && false = 0 === 1
        //      1              ---- false && false = -1 == 0
      }
    </div>
  );
};
