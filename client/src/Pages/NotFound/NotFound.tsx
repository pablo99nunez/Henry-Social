import { Link } from 'react-router-dom' 
import useUser from "../../Hooks/useUser";
import styles from './NotFound.module.scss'
import NavSearch from '../../Components/NavSearch/NavSearch' 

const NotFound = () => {

  const user = useUser();
  document.title = '404: Not Found | Henry Social'

  return (
    <div className={styles.notFound}>
      <NavSearch />
      <div className={styles.content}>
        <h1>404</h1>
        <h2>No esperabamos esta visita,<br/> estas opciones podrían ayudarte</h2>
        <div className={styles.links}>
          <Link to='/'>Ir a Inicio</Link>
          {user && <Link to={`/profile/${user?.username}`}>Ver Perfil</Link>}
        </div>
      </div>
    </div>
  )
}

export default NotFound