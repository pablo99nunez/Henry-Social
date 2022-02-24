import axios from "axios";
import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../Hooks/useUser";
import { getPosts } from "../../redux/actions/actions";
import { InfoAlert } from "../Alert/Alert";
import { FaUpload, FaCheck } from 'react-icons/fa'
import styles from "./AddPost.module.scss";

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setOpen: Function;
};

const AddPost: FC<Props> = ({ setOpen }) => {
  const user = useUser();
  const dispatch = useDispatch();

  const [typePost, setTypePost] = useState('normal')
  const [post, setPost] = useState({
    text: '',
    image: '',
    company: '',
    position: '',
    companyLink: '',
    salary: '',
    costoClases: '',
    temasClases: '',
    tecnologíaClases: '',
  })

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e)
    setPost({...post, [e.target.name]: e.target.value});
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let name = e.target.name
    if(name === typePost) {return setTypePost('normal')}
    setTypePost(name)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user)
      axios
        .post(`/post`, {
          // No quiero romper la creacion de post, por lo que de momento te envio el texto, ni bien este listo el modelo para recibir demas contenido se implementa mandando post
          body: post.text,
          company: post.company,
          author: user,
          typePost,
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
      abr: 'multimedia',
      text: 'Foto / Video'
    },
    {
      abr: 'boom',
      text: 'Boom'
    },
    {
      abr: 'empleo',
      text: 'Ofertas de empleo'
    },
    {
      abr: 'servicio',
      text: 'Servicio'
    }
    // {
    //   abr: 'pregunta',
    //   text: 'Pregunta'
    // },
  ]

  return (
    <form
      onSubmit={e => handleSubmit(e)}
      onChange={e => handleChange(e)}
      className={styles.modal_add_post}
     >
      <div className={styles.add_post_content}>
        {typePost !== 'normal' && typePost !== 'multimedia' &&
          <div className={styles.content__inputs}>
            {typePost === 'servicio' ?
            <>
              <input 
                type="text" 
                name='tecnologíaClases'
                placeholder='Tecnología'
                defaultValue={post.tecnologíaClases}
              />  
              <input 
                type="text" 
                name='temasClases'
                placeholder='Temas'
                defaultValue={post.temasClases}
              />  
              <input 
                name='costoClases'
                type="number" 
                defaultValue={post.costoClases}
                placeholder='Costo de las clases'
              />  
            </> :
            <>
              <input 
                type="text" 
                name="nameEmpresa" 
                defaultValue={post.company}
                placeholder="Nombre de la Empresa"
              />
              <input 
                type="text" 
                name="rolEmpresa" 
                defaultValue={post.position}
                placeholder="Rol en la Empresa"
              />
            </>
            }
            {typePost === 'empleo' &&
            <>
              <input 
                name="linkEmpleo" 
                type="url" 
                defaultValue={post.companyLink}
                placeholder="Link del Empleo"
              />
              <input 
                min='0'
                type="number" 
                name="salarioEmpleo" 
                defaultValue={post.salary}
                placeholder="Salario (Opcional)"
              />
            </>
            }
          </div>
        }
        <div className={styles.content__textImage}>
          <textarea
            name="text"
            placeholder={typePost === 'boom' 
            ? 'Cuentanos tu emoción en el comienzo de tu nueva aventura' 
            : typePost === 'empleo' ? 'Explica más sobre este empleo' 
            : typePost === 'servicio' ? 'Cuentanós sobre tus clases y sobre quien eres' 
            : '¿Que estas pensando?'}
            className={post.text ? styles.active : ''}
          ></textarea>
          {typePost === 'multimedia' &&
            <div className={styles.boxImage}>
              <label 
                htmlFor="image"
                title={post.image ? 'Cambia tu archivo' : 'Selecciona tu archivo'}
              >
                {post.image ?
                  <>
                    <FaCheck/>
                    <p>{post.image.slice(12)}</p>
                  </>
                : <FaUpload/>}
              </label>
              <input type="file" name="image" id="image" />
            </div>
          }
        </div>
      </div>
      <div className={styles.add_post_tags}>
        {types.map((t,i) =>
          <button 
            key={i}
            name={t.abr}
            type="button"
            onClick={e => handleClick(e)}
            className={typePost === t.abr ? styles.select : styles.deselect}
          >{t.text}</button>
        )}
      </div>
      <div className={styles.add_post_buttons}>
        <input type='submit' value='Publicar'/>
        <button 
          type="button" 
          onClick={() => setOpen(false)}
        >Cancelar</button>
      </div>
    </form>
  );
};

export default AddPost;