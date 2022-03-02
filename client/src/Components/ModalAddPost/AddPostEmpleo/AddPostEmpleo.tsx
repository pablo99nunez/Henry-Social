import axios from "axios";
import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../../Hooks/useUser";
import { getPosts } from "../../../redux/actions/actions";
import styles from "./AddPost.module.scss";
import { uploadFile } from "../../../../../src/services/firebase/Helpers/uploadFile";
import {validateChange} from '../validate'

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
};



const AddPostEmpleo: FC<Props> = ({ setOpen }) => {
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
                <div>
                <div className={styles.input_with_error}>
                <input
                  type="text"
                  name="company"
                  defaultValue={post.company}
                  placeholder="Nombre de la Empresa"
                />
                {errors?.company && (<p>{errors.company}</p>)}
              </div>
              <div className={styles.input_with_error}>
                  <input
                    type="text"
                    name="position"
                    defaultValue={post.position}
                    placeholder="Rol en la Empresa"
                  />
                {errors?.position && (<p>{errors.position}</p>)}
                </div>
                <div className={styles.input_with_error}>
                  <input
                    type="file"
                    accept=".png"
                    name="companyImage"
                    defaultValue={post.companyImage}
                    placeholder="Imagen de la empresa"
                  />
                  {errors?.imageCompany && (<p>{errors.imageCompany}</p>)}
                  </div>
                  <div className={styles.input_with_error}>
                <input
                  name="companyLink"
                  type="url"
                  defaultValue={post.companyLink}
                  placeholder="Link del Empleo"
                />
                {errors?.companyLink && (<p>{errors.companyLink}</p>)}
              </div>
                  <div className={styles.input_with_error}>
                <input
                  min="0"
                  type="number"
                  name="salary"
                  defaultValue={post.salary}
                  placeholder="Salario (Opcional)"
                />
                {errors?.salary && (<p>{errors.salary}</p>)}
              </div>
            </div>
        <div className={styles.content__textImage}>
          <textarea
            name="text"
            placeholder= "Explica más sobre este empleo"
            className={post.text ? styles.active : errors?.text ? styles.error : ""}
          ></textarea>
        </div>
      </div>
      </div>
  );
};

export default AddPostEmpleo;
