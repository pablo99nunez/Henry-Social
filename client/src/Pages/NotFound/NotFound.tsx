import { Link } from 'react-router-dom' 
import useUser from "../../Hooks/useUser";
import styles from './NotFound.module.scss'
import NavSearch from '../../Components/NavSearch/NavSearch' 
import LoadingPage from '../../Components/LoadingPage/LoadingPage';
import { Helmet } from "react-helmet";

const NotFound = () => {

  const user = useUser();

  return (
    <>{
      !user ? <LoadingPage/>
      : <div className={styles.notFound}>
        <Helmet>
          <meta charSet="utf-8"/>
          <meta name="Página de error" content="Página no encontrada"/>
          <title>404 Página no encontrada | Henry Social</title>
        </Helmet>
      <NavSearch />
        <div className={styles.content}>
          <h1>404</h1>
          <h2>No esperebamos esta visita,<br/> estas opciones podrían ayudarte</h2>
          <div className={styles.links}>
            <Link to='/'>Ir a Inicio</Link>
            {user && <Link to={`/profile/${user?.username}`}>Ver Perfil</Link>}
          </div>
        </div>
      </div>
    }</>
  )
}

export default NotFound