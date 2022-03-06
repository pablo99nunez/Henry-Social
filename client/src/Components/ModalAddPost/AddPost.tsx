import axios from "axios";
import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../Hooks/useUser";
import { getPosts } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import { FaUpload, FaCheck } from "react-icons/fa";
import styles from "./AddPost.module.scss";
import { uploadFile } from "../../../src/firebase/Helpers/uploadFile";
import { motion } from "framer-motion";

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
};

const AddPost: FC<Props> = ({ setOpen }) => {
  const user = useUser();
  const dispatch = useDispatch();

  const [typePost, setTypePost] = useState("normal");
  const [post, setPost] = useState<any>({
    text: "",
    image: "",
    company: "",
    position: "",
    companyLink: "",
    companyImage: null,
    salary: 0,
    costoClases: "",
    temasClases: "",
    tecnologíaClases: "",
    tags: [],
  });

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.name === "companyImage" && target.files)
      setPost({ ...post, [target.name]: target.files[0] });
    else
      setPost({
        ...post,
        [target.name]: target.value,
        tags:
          target.name === "text" ? target.value.match(/(#)\w+/g) : post.text,
      });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.name;
    if (name === typePost) {
      return setTypePost("normal");
    }
    setTypePost(name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const downloadURL =
      post.companyImage instanceof File
        ? await uploadFile(post.companyImage)
        : post.companyImage;

    if (user)
      axios
        .post(`/post`, {
          body: post.text,
          company: post.company,
          position: post.position,
          companyLink: post.companyLink,
          companyImage: downloadURL,
          pregunta: post.pregunta,
          salary: post.salary,
          author: user,
          typePost,
          tags: post.tags,
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
      onSubmit={(e) => handleSubmit(e)}
      onChange={(e) => handleChange(e)}
      className={styles.modal_add_post}
      animate={{
        scaleX: 1,
        scaleY: 1,
      }}
    >
      <div className={styles.add_post_content}>
        {typePost === "pregunta" ? (
          <div className={styles.content__inputs}>
            <input
              type="text"
              name="pregunta"
              placeholder="¿Cual es tu pregunta?"
            />
          </div>
        ) : (
          typePost !== "normal" &&
          typePost !== "multimedia" && (
            <div className={styles.content__inputs}>
              {typePost === "servicio" ? (
                <>
                  <input
                    type="text"
                    name="tecnologíaClases"
                    placeholder="Tecnología"
                    defaultValue={post.tecnologíaClases}
                  />
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
                  <input
                    type="text"
                    name="company"
                    defaultValue={post.company}
                    placeholder="Nombre de la Empresa"
                    required
                  />
                  <input
                    type="text"
                    name="position"
                    defaultValue={post.position}
                    placeholder="Rol en la Empresa"
                    required
                  />

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
                  <input
                    name="companyLink"
                    type="url"
                    defaultValue={post.companyLink}
                    placeholder="Link del Empleo"
                    required
                  />
                  <input
                    min="0"
                    type="number"
                    name="salary"
                    defaultValue={post.salary}
                    placeholder="Salario (Opcional)"
                  />
                </>
              )}
            </div>
          )
        )}
        <div className={styles.content__textImage}>
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
                    <p>{post.image.slice(12)}</p>
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
        <input type="submit" value="Publicar" />
        <button type="button" onClick={() => setOpen(false)}>
          Cancelar
        </button>
      </div>
    </motion.form>
  );
};

export default AddPost;
