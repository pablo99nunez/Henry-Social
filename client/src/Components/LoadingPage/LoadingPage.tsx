import { RiLoader5Fill } from "react-icons/ri";
import { IconContext } from "react-icons";

import style from "./LoadingPage.module.scss";

export default function LoadingPage() {
  return (
    <IconContext.Provider
      value={{ color: 'yellow', size: '10rem' }}>
      <div id={style.cont}>
        <RiLoader5Fill id={style.load}/>
      </div>
    </IconContext.Provider>
  )
}
