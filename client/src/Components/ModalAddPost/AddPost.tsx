import axios from "axios";
import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../Hooks/useUser";
import { getPosts } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import { FaUpload, FaCheck } from "react-icons/fa";
import styles from "./AddPost.module.scss";
import { uploadFile } from "../../../../src/services/firebase/Helpers/uploadFile";
import { motion } from "framer-motion";
import validate from "./validate";
type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
};

const AddPost: FC<Props> = ({ setOpen }) => {
  const user = useUser();
  const dispatch = useDispatch();

  const [typePost, setTypePost] = useState("normal");
  const [errors, setErrors] = useState({
    text: "",
    company: "",
    companyLink: "",
    salary: "",
    position: "",
    /*tecnologíaClases: "",
      costoClases: "", */
    imageCompany: "",
    pregunta: "",
    getError: false,
  });
  const [post, setPost] = useState<any>({
    text: "",
    image: null,
    company: "",
    position: "",
    companyLink: "",
    companyImage: null,
    salary: 0,
    costoClases: "0",
    temasClases: "",
    tecnologíaClases: "",
    tags: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "companyImage" ||
      (e.target.name === "image" && e.target.files)
    )
      setPost({ ...post, [e.target.name]: e.target.files[0] });
    else setPost({ ...post, [e.target.name]: e.target.value });

    setErrors(
      validate(
        {
          ...post,
          [e.target.name]: e.target.value,
          tags:
            e.target.name === "text"
              ? e.target.value.match(/(#)\w+/g)
              : post.text,
        },
        typePost
      )
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.name;
    setPost({
      text: "",
      image: "",
      company: "",
      position: "",
      companyLink: "",
      companyImage: null,
      salary: "",
      costoClases: "0",
      temasClases: "",
      tecnologíaClases: "",
      tags: [],
    });
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

    if (user && post.text) {
      axios
        .post(`/post`, {
          body: post.text,
          company: post.company,
          position: post.position,
          companyLink: post.companyLink,
          companyImage: downloadURLCompany,
          pregunta: post.pregunta,
          salary: post.salary,
          author: user,
          typePost,
          tags: post.tags,
          image: downloadURLImage,
        })
        .then((data) => {
          InfoAlert.fire({
            title: "Publicado con éxito",
            icon: "success",
          });
          setOpen(false);
          dispatch(getPosts());
          return data;
        })
        .catch((error) => console.error("Error:", error));
    } else if (!post.text) {
      setErrors({
        ...errors,
        text: "Agregue algo de contenido a su publicación",
      });
    }
  };

  const types = [
    {
      abr: "multimedia",
      text: "Foto / Video",
    },
    {
      abr: "boom",
      text: "Boom",
    },
    {
      abr: "empleo",
      text: "Ofertas de empleo",
    },
    // {
    //     abr: "servicio",
    //     text: "Servicio",
    // },
    {
      abr: "pregunta",
      text: "Pregunta",
    },
  ];

  return (
    <motion.form
      onChange={(e) => handleChange(e)}
      onSubmit={(e) => handleSubmit(e)}
      className={styles.modal_add_post}
      animate={{
        scaleX: 1,
        scaleY: 1,
      }}
    >
      <div className={styles.add_post_content}>
        {typePost === "pregunta" ? (
          <div className={styles.content__inputs}>
            <div className={styles.input_with_error}>
              <span className={styles.input_effects}>
                <input type="text" name="pregunta" placeholder="." />{" "}
                <span>¿Cual es tu pregunta?</span>
              </span>
              {errors?.pregunta && <p>{errors.pregunta}</p>}
            </div>
          </div>
        ) : (
          typePost !== "normal" &&
          typePost !== "multimedia" && (
            <div className={styles.content__inputs}>
              {typePost === "servicio" ? (
                <>
                  <div className={styles.input_with_error}>
                    <input
                      type="text"
                      name="tecnologíaClases"
                      placeholder="Tecnología"
                      defaultValue={post.tecnologíaClases}
                      required
                    />
                    {/* {errors?.tecnologíaClases && (
                                 <p>{errors.tecnologíaClases}</p>
                              )} */}
                  </div>
                  <input
                    type="text"
                    name="temasClases"
                    placeholder="Temas"
                    defaultValue={post.temasClases}
                  />
                  <input
                    name="costoClases"
                    type="number"
                    defaultValue={post.costoClases}
                    placeholder="Costo de las clases"
                  />
                </>
              ) : (
                <>
                  <div className={styles.input_with_error}>
                    <span className={styles.input_effects}>
                      <input
                        type="text"
                        name="company"
                        defaultValue={post.company}
                        placeholder="."
                        required
                      />
                      <span>Nombre de la empresa</span>
                    </span>
                    {errors?.company && <p>{errors.company}</p>}
                  </div>
                  <div className={styles.input_with_error}>
                    <span className={styles.input_effects}>
                      <input
                        type="text"
                        name="position"
                        defaultValue={post.position}
                        placeholder="."
                        required
                      />
                      <span>Rol en la Empresa</span>
                    </span>
                    {errors?.position && <p>{errors.position}</p>}
                  </div>
                  <input
                    type="file"
                    accept=".png"
                    name="companyImage"
                    defaultValue={post.companyImage}
                    placeholder="Imagen de la empresa"
                  />
                </>
              )}
              {typePost === "empleo" && (
                <>
                  <div className={styles.input_with_error}>
                    <span className={styles.input_effects}>
                      <input
                        name="companyLink"
                        type="url"
                        defaultValue={post.companyLink}
                        placeholder="."
                        required
                      />{" "}
                      <span>Link del Empleo</span>
                    </span>
                    {errors?.companyLink && <p>{errors.companyLink}</p>}
                  </div>
                  <div className={styles.input_with_error}>
                    <span className={styles.input_effects}>
                      <input
                        min="0"
                        type="number"
                        name="salary"
                        defaultValue={post.salary}
                        placeholder="."
                      ></input>
                      <span>Salario (opcional)</span>
                    </span>
                    {errors?.salary && <p>{errors.salary}</p>}
                  </div>
                </>
              )}
            </div>
          )
        )}
        <div className={styles.content__textImage}>
          <div className={styles.textarea_with_error}>
            <textarea
              name="text"
              placeholder={
                typePost === "boom"
                  ? "Cuentanos tu emoción en el comienzo de tu nueva aventura"
                  : typePost === "empleo"
                  ? "Explica más sobre este empleo"
                  : typePost === "servicio"
                  ? "Cuentanós sobre tus clases y sobre quien eres"
                  : typePost === "pregunta"
                  ? "Describe tu duda."
                  : "¿Que estas pensando?"
              }
              className={post.text ? styles.active : ""}
            ></textarea>
            {errors?.text && <p>{errors.text}</p>}
          </div>
          {typePost === "multimedia" && (
            <div className={styles.boxImage}>
              <label
                htmlFor="image"
                title={
                  post.image ? "Cambia tu archivo" : "Selecciona tu archivo"
                }
              >
                {post.image ? (
                  <>
                    <FaCheck />
                    <p>{post.image.name}</p>
                  </>
                ) : (
                  <FaUpload />
                )}
              </label>
              <input type="file" name="image" id="image" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.add_post_tags}>
        {types.map((t, i) => (
          <button
            key={i}
            name={t.abr}
            type="button"
            onClick={(e) => handleClick(e)}
            className={typePost === t.abr ? styles.select : styles.deselect}
          >
            {t.text}
          </button>
        ))}
      </div>
      <div className={styles.add_post_buttons}>
        <input
          type="submit"
          value="Publicar"
          className={errors.getError ? styles.disabledSubmit : ""}
        />
        <button type="button" onClick={() => setOpen(false)}>
          Cancelar
        </button>
      </div>
    </motion.form>
  );
};

export default AddPost;
