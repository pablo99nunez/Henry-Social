import { useEffect, useRef, useState, FC } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import style from "./Like.module.scss";
import { IPost } from "../../../../src/models/Post";
import useUser from "../../Hooks/useUser";
import axios from "axios";
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";

type Props = {
  post: IPost;
};

export const Like: FC<Props> = ({ post }) => {
  const icon = useRef<HTMLDivElement>(null);
  const [like, setLike] = useState<boolean>(false);
  const socket = useSelector((state: IState) => state.socket);
  const [sum, setSum] = useState(true);
  const user = useUser();
  const handleLike = async () => {
    if (user) {
      setLike(!like);

      await axios.post("/like", {
        _id: post._id,
        author: user,
      });
      socket?.emit("send_notification", post._id);
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
        {like ? <BsHeartFill /> : <BsHeart />}
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
