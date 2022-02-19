import React, {useState} from "react";
import "./index.scss";

const ModalAddPost: React.FunctionComponent = ()=>{
   const [textarea, setTextarea] = useState("");
   const [buttons, setButtons] = useState({fotoVideo: "", tag: ""});

   const handleChange = (e: any)=>{
      setTextarea(e.target.value);
   }

   const handleClick = (e: any)=>{
      if(e.target.textContent === "Foto/Video"){
         setButtons({
            ...buttons,
            fotoVideo: e.target.textContent,
         });
      } else {
         setButtons({
            ...buttons,
            tag: e.target.textContent,
         });
      }
   }

   const handleSubmit = (e: any) => {
      fetch(`http://localhost:3001/post`, {
      method: "POST", // or "PUT"
      body: JSON.stringify({...buttons ,textarea: textarea}), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((data) => {
        console.log("Success:", data);
        return data;
      });
   }
   console.log(buttons);
  return(
    <aside className="modal-add-post">
      <div className="add-post-title">
        <h2>Crea una Publicacion</h2>
      </div>
      <div className="add-post-textarea">
        <textarea name="textarea" cols={30} rows={50} onChange={(e)=>handleChange(e)}></textarea>
      </div>
      <div className="add-post-tags">
        <button onClick={(e)=>handleClick(e)}>Foto/Video</button>
        <button onClick={(e)=>handleClick(e)}>Boom</button>
        <button onClick={(e)=>handleClick(e)}>Ofertas de empleo</button>
        <button onClick={(e)=>handleClick(e)}>Servicio</button>
        <button onClick={(e)=>handleClick(e)}>Pregunta</button>
      </div>
      <div className="add-post-buttons">
        <button onClick={(e)=>handleSubmit(e)}>Publicar</button>
        <button>Cancelar</button>
      </div>

    </aside>
  );
}

export default ModalAddPost;
