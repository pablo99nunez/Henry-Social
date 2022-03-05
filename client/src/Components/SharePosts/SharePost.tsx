import axios from "axios";
import React, { useRef, FC } from "react";
import { InfoAlert } from "../Alert/Alert";
import useUser from "../../Hooks/useUser";
import styles from './SharePost.module.scss'
import {IPost} from '../../../../src/models/Post'
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/actions";

type Props = {
    post: IPost;
    openShare: boolean;
    setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SharePost:FC<Props> = ({ post, openShare, setOpenShare }) => {
    const user = useUser();
    const dispatch = useDispatch();
    const textareaRef = useRef<MutableRefObject<undefined>>()

    const autosize = () => {
      const textarea = textareaRef.current
      setTimeout(function(){
        textarea.style.cssText = 'height:auto; padding:0';
        textarea.style.cssText = 'height:' + (textarea.scrollHeight + 10) + 'px';
      },0);
    }    

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (user) {
        axios
          .post(`/post`, {
            author: user,
            body: textareaRef.current.value,
            company: post._id, // Por mientras esta siendo utilizada esta propiedad para el id del Post a compartir
            typePost: 'share',
          })
          .then((data) => {
            InfoAlert.fire({
              title: "Compartido con éxito.",
              icon: "success",
            });
            setOpenShare(!openShare)
            dispatch(getPosts());
            return data;
          })
          .catch((error) => console.error("Error:", error));
      }
    };
    
    return(
      <form 
        className={styles.share}
        onSubmit={e => handleSubmit(e)}
        style={{display: openShare ? 'flex' : 'none'}}
      >
        <textarea 
          id="text" 
          name="text" 
          ref={textareaRef}
          onKeyDown={() => autosize()}
          placeholder="Haz un comentario..."
          />
        <input 
          type="submit" 
          value="Compartir ahora" 
        />
      </form>
    )
}