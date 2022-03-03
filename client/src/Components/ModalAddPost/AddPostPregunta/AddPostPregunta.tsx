import axios from "axios";
import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../../Hooks/useUser";
import { getPosts } from "../../../redux/actions/actions";
import styles from "./AddPost.module.scss";
import { uploadFile } from "../../../../../src/services/firebase/Helpers/uploadFile";
import { motion } from "framer-motion";
import {validateChange} from '../validate'

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
};



const AddPost: FC<Props> = ({ setOpen }) => {
  const user = useUser();
  const dispatch = useDispatch();

  const [typePost, setTypePost] = useState("normal");
  const [errors, setErrors] = useState({
    company: "",
    companyLink: "",
    salary: "",
    position: "",
    tecnologíaClases: "",
    costoClases: "",
    imageCompany: "",
    pregunta: "",
    text: ""
  });
  const [post, setPost] = useState<any>({
    text: "",
    image: "",
    company: "",
    position: "",
    companyLink: "",
    companyImage: null,
    salary: 0,
    costoClases: "0",
    temasClases: "",
    tecnologíaClases: "",
    pregunta:"",
    tags: []
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "companyImage" && e.target.files)
      setPost({ ...post, [e.target.name]: e.target.files[0] });
    else setPost({ ...post, [e.target.name]: e.target.value });

    setErrors(
      validateChange({
         ...post,
         [e.target.name]: e.target.value,
         tags:
                    e.target.name === "text"
                        ? e.target.value.match(/(#)\w+/g)
                        : post.text,
      })
   );
  };


  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.name;
    if (name === typePost) {
      return setTypePost("normal");
    }
    setTypePost(name);
    setErrors("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const downloadURLCompany =
      post.companyImage instanceof File
        ? await uploadFile(post.companyImage)
        : post.companyImage;

    const downloadURLImage =
      post.image instanceof File ? await uploadFile(post.image) : post.image;
    
  };

  return (
      <div>
      <div className={styles.add_post_content}>
          <div className={styles.content__inputs}>
            <div className={styles.input_with_error}>
            <input
              type="text"
              name="pregunta"
              placeholder="¿Cual es tu pregunta?"
            />
            {errors?.pregunta && (<p>{errors.pregunta}</p>)}
            </div>
          </div>
        <div className={styles.content__textImage}>
          <textarea
            name="text"
            placeholder= "Describe tu duda."
            className={post.text ? styles.active : errors?.text ? styles.error : ""}
          ></textarea>
        </div>
      </div>
      </div>
  );
};

export default AddPost;
