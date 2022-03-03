import { useEffect, useRef, useState, FC } from "react";
import {IPost} from '../../../../src/models/Post'
import { IoArrowRedoOutline, IoArrowRedoSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import useUser from "../../Hooks/useUser";
import axios from "axios";

type Props = {
    post: IPost;
    share: boolean;
    setShare: Function;
}

export const SharePost:FC<Props> = ({ post }) => {
    const icon = useRef<HTMLDivElement>(null);
    const [share ,setShare] = useState<boolean>(false);
    const [sum, setSum] = useState(true);
    const user = useUser();

    const handleShare = () => {
        if (user) {
        setShare(!share);
    
        axios.post("/like", {
            _id: post._id,
            author: user,
            });
        }
        };
        useEffect(() => {
        if (user?._id && post) {
            const isShared = post?.nLikes?.includes(user._id);
        if (isShared) setSum(false);
        setShare(isShared);
        }
    }, [user, post]);
    
    const variants = {
        liked: { scale: [1, 1.1, 1], rotateZ: [0, 30, -30, 0] },
        disliked: { scale: [1.1, 1] },
    };
    return(
        <div 
        //className={style.like}
        >
            <div>
                <h1>{post?.author}</h1>
            </div>
        <p></p>
        {

        }
      </div>
    )
}