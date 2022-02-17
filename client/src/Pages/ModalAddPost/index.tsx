import React from "react";
import "./index.css";

const ModalAddPost: React.FunctionComponent = ()=>{
  return(
    <aside className="modal-add-post">
      <div className="add-post-title">
        <h2>Crea una Publicacion</h2>
      </div>
      <div className="add-post-textarea">
        <textarea name="" id="" cols={30} rows={50}></textarea>
      </div>
      <div className="add-post-tags">
        <button>Foto/Video</button>
        <button>Boom</button>
        <button>Ofertas de empleo</button>
        <button>Servicio</button>
        <button>Pregunta</button>
      </div>
      <div className="add-post-buttons">
        <button>Publicar</button>
        <button>Cancelar</button>
      </div>

    </aside>
  );
}

export default ModalAddPost;
