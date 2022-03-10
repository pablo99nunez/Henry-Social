import axios from "axios";
import React, { useState, FC, useRef, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../Hooks/useUser";
import { getPosts, setPostEdit } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import styles from "./AddPost.module.scss";
import { uploadFile } from "../../firebase/Helpers/uploadFile";
import { motion } from "framer-motion";
import validate from "./validate";
import { IState } from "../../redux/reducer";
type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>> | null;
};

const AddPost: FC<Props> = ({ setOpen, edit, setEdit }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const imagePost = useRef<HTMLInputElement>(null);
  const imageComPost = useRef<HTMLInputElement>(null);
  const { postEdit } = useSelector((state: IState) => state);
  const [loadSend, setLoadSend] = useState(false);
  const [typePost, setTypePost] = useState(postEdit?.typePost || "normal");

  const [post, setPost] = useState({
    text: postEdit?.body || "",
    image: postEdit?.image || null,
    company: postEdit?.company || "",
    position: postEdit?.position || "",
    companyLink: postEdit?.companyLink || "",
    companyImage: postEdit?.companyImage || null,
    pregunta: postEdit?.companyImage || "",
    salary: postEdit?.salary || 0,
    salaryCoin: postEdit?.salaryCoin || 'DOL',
    // costoClases: "0",
    // tecnologíaClases: "",
    // temasClases: "",
    tags: postEdit?.tags || [],
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    const files = e.target.files
    
    if (
      (name === "companyImage" || 
      (name === "image" && files)) && files
    )
      setPost({ 
        ...post, 
        [name]: URL.createObjectURL(files[0])
      });
    else if ( name === 'text' ) 
      setPost({
        ...post, 
        text: value,
        tags: value.includes('#') ? value.match(/(#)\S+/g) : []
      })
    else setPost({ ...post, [name]: value });

    setErrors(
      validate(
        {
          ...post,
          [name]: value,
          tags:
            name === "text"
              ? value.match(/(#)\w+/g)
              : post.text,
        },
        typePost
      )
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.name;
    !edit && setPost({
      text: "",
      image: "",
      company: "",
      position: "",
      companyLink: "",
      companyImage: null,
      pregunta: "",
      salary: 0,
      salaryCoin: 'DOL',
      // costoClases: 0,
      // temasClases: "",
      // tecnologíaClases: "",
      tags: [],
    });
    if (name === typePost) {
      return setTypePost("normal");
    }
    setTypePost(name);
    setErrors({
      text: "",
      company: "",
      companyLink: "",
      salary: "",
      position: "",
      imageCompany: "",
      pregunta: "",
      getError: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const downloadURLCompany =
      imageComPost.current?.files &&
      imageComPost.current?.files[0] instanceof File
        ? await uploadFile(imageComPost.current?.files[0])
        : post.companyImage;
    const downloadURLImage =
      imagePost.current?.files && imagePost?.current?.files[0] instanceof File
        ? await uploadFile(imagePost?.current?.files[0])
        : post.image;

    if ((user && post.text) || edit) {
      const dates = {
        body: post.text,
        company: post.company,
        position: post.position,
        companyLink: post.companyLink,
        companyImage: downloadURLCompany,
        pregunta: post.pregunta,
        salary: post.salary,
        salaryCoin: post.salaryCoin,
        typePost,
        image: downloadURLImage,
        tags: post.tags,
        author: user,
      };
      const ruta = edit ? `/editPost` : `/post`;
      const content = edit
        ? {
            post: dates,
            idPost: postEdit?._id || null,
          }
        : dates;

      const pageUser = location.href.includes("profile");
      setLoadSend(true)
      axios
        .post(ruta, content)
        .then((data) => {
          InfoAlert.fire({
            title: `${edit ? "Editado" : "Publicado"} con éxito"`,
            icon: "success",
          });
          setOpen(false);
          setEdit && setEdit(false);
          !pageUser && dispatch(getPosts());
          postEdit && dispatch(setPostEdit(null));
          setLoadSend(false)
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

  const coins = ['DOL', 'ARS', 'MXN', 'EUR', 'PEN'];

  return (
    <motion.form
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
                <input
                  type="text"
                  name="pregunta"
                  placeholder="."
                  defaultValue={post.pregunta}
                  onChange={(e) => handleChange(e)}
                />{" "}
                <span>¿Cual es tu pregunta?</span>
              </span>
              {errors?.pregunta && <p>{errors.pregunta}</p>}
            </div>
          </div>
        ) : (
          typePost !== "normal" &&
          typePost !== "multimedia" &&
          typePost !== "share" && (
            <div className={styles.content__inputs}>
              {typePost === "servicio" ? (
                <>
                  <div className={styles.input_with_error}>
                    <input
                      type="text"
                      onChange={(e) => handleChange(e)}
                      name="tecnologíaClases"
                      placeholder="Tecnología"
                      // defaultValue={post.tecnologíaClases}
                      required
                    />
                    {/* {errors?.tecnologíaClases && (
                                  <p>{errors.tecnologíaClases}</p>
                              )} */}
                  </div>
                  <input
                    type="text"
                    name="temasClases"
                    onChange={(e) => handleChange(e)}
                    placeholder="Temas"
                    // defaultValue={post.temasClases}
                  />
                  <input
                    name="costoClases"
                    onChange={(e) => handleChange(e)}
                    type="number"
                    // defaultValue={post.costoClases}
                    placeholder="Costo de las clases"
                  />
                </>
              ) : (
                <>
                  <div className={styles.input_with_error}>
                    <span className={styles.input_effects}>
                      <input
                        type="text"
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
                    ref={imageComPost}
                    name="companyImage"
                    onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        name="salary"
                        defaultValue={post.salary}
                        placeholder="."
                      />
                      <span>Salario (opcional)</span>
                    </span>
                    <select 
                      name="salaryCoin"
                      onChange={(e: any) => handleChange(e)}
                    >
                      <option value={post.salaryCoin}>{post.salaryCoin}</option> 
                      {coins.map((e,i) =>
                        e !== post.salaryCoin && <option key={i} value={e}>{e}</option>
                      )}
                    </select>  
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
              defaultValue={post.text}
              onChange={(e: any) => handleChange(e)}
              className={post.text ? styles.active : ""}
            />
            {errors?.text && <p>{errors.text}</p>}
          </div>
          {typePost === "multimedia" && (
            <>
              <label
                htmlFor="image"
                className={`${styles.boxImage} ${
                  post.image && styles.withImage
                }`}
              >
                <div className={styles.hoverImage}>
                  <span>
                    {post.image ? "Cambiar imagen" : "Seleccionar imagen"}
                  </span>
                </div>
                {post.image && <img src={post.image} />}
              </label>
              <input
                id="image"
                type="file"
                name="image"
                ref={imagePost}
                accept="image/*"
                onChange={(e) => handleChange(e)}
              />
            </>
          )}
        </div>
      </div>
      {typePost !== 'share' && 
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
      }
      <div className={styles.add_post_buttons}>
        <input
          type="submit"
          value={loadSend ? 'Creando Post...' : edit ? "Editar" : "Publicar"}
          disabled={loadSend || Object.values(errors).some(e => e)}
        />
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            postEdit && dispatch(setPostEdit(null));
          }}
        >
          Cancelar
        </button>
      </div>
    </motion.form>
  );
};

export default AddPost;
