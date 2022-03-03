import axios from "axios";
import React, { useState, FC } from "react";
import styles from "../AddPost.module.scss";
import { uploadFile } from "../../../../../src/services/firebase/Helpers/uploadFile";

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
    post: any,
    setPost: Function
}


export default function AddPostBoom ({ post, setPost }: Props) {
   

  return (
      <div className={styles.modal_add_post}>
      <div className={styles.add_post_content}>
                <div className={styles.input_with_error} >
                <input
                  type="text"
                  name="company"
                  defaultValue={post?.company}
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
        <div className={styles.content__textImage}>
          <textarea
            name="text"
            placeholder= "Cuentanos tu emoción en el comienzo de tu nueva aventura"
            className={post.text ? styles.active : errors?.text ? styles.error : ""}
          ></textarea>
        </div>
      </div>
      </div>
  );
};
