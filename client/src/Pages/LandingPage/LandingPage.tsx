import style from "./LandingPage.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import chat from "../../assets/images/Chat.gif";
import donations from "../../assets/images/Donations.gif";
import post from "../../assets/images/Post.png";
import questions from "../../assets/images/Questions.png";
import welcome from "../../assets/images/Welcome1.png";

export default function LandingPage({ handleActionChange }: any) {
  const user = useSelector((state: IState) => state.user);
  return (
    <div>
      <div id={style.cont}>
        <header>
          <div id={style.title_cont}>
            <img
              src="https://assets.soyhenry.com/assets/LOGO-HENRY-03.png"
              alt="icon"
            />
            <h1> | Social </h1>
          </div>
          {user?.username ? (
            <div className={style.headers_buttons}>
              <Link to="/">
                <button className={style.act_btn}>Volver a la Home</button>
              </Link>
            </div>
          ) : (
            <div className={style.headers_buttons}>
              <Link to="/login">
                <button
                  className={style.act_btn}
                  onClick={handleActionChange}
                  value="logIn"
                >
                  Ingresar
                </button>
              </Link>
              <Link to="/login">
                <button
                  className={style.act_btn2}
                  onClick={handleActionChange}
                  value="signUp"
                >
                  Registrarse
                </button>
              </Link>
            </div>
          )}
        </header>
        <div id={style.first_section}>
          <h1>Henry Social</h1>
          <div id={style.control_animation}>
            <h2 id={style.animation}>
              <span>La </span>
              <div id={style.animation_div1}>
                <ul id={style.ul1}>
                  <li>red social </li>
                  <li>comunidad </li>
                </ul>
              </div>
            </h2>
            <h2 id={style.animation}>
              <span> hecha</span>
              <div id={style.animation_div1}>
                <ul id={style.ul2}>
                  <li>para </li>
                  <li>por </li>
                </ul>
              </div>
            </h2>
            <h2 id={style.animation}>
              <span>Henrys </span>
              <div id={style.animation_div1}>
                <ul id={style.ul3}>
                  <li>🚀</li>
                  <li>👩‍💻</li>
                  <li>😎</li>
                  <li>👨‍🎓</li>
                  <li>👨‍🚀</li>
                </ul>
              </div>
            </h2>
          </div>
          <img src={welcome} alt="welcome" />
        </div>
        <section id={style.second_section}>
          <h2>Que puedes hacer en esta comunidad?</h2>
          <div id={style.grid_section}>
            <div>
              <img src={chat} alt="chat" />
            </div>
            <div id={style.description}>
              <h3>Chat en vivo</h3>
              <p>
                Puedes comunicarte con tus compañeros y colegas de toda la
                comunidad mediante nuestra aplicación de chat en vivo exclusiva
                para Henrys.
              </p>
            </div>
            <div id={style.description}>
              <h3>Compartir momentos</h3>
              <p>
                Puedes postear y compartir lo que quieras, desde imágenes hasta
                ofertas de empleo. En nuestra comunidad puedes encontrar tu
                próxima oportunidad laboral o enterarte de cual de tus
                compañeros ya consiguieron empleo.
              </p>
            </div>
            <div>
              <img src={post} alt="post" />
            </div>
            <div>
              <img src={questions} alt="questions" />
            </div>
            <div id={style.description}>
              <h3>Resolver tus dudas</h3>
              <p>
                Si estas estancado con algún ejercicio o con alguna homework
                puedes postear tu pregunta la cual sera enviada a los TA
                presentes en esta app que sin duda enviaran tu respuesta para
                que todos puedan verla, comentar y/o aportar mas conocimiento
              </p>
            </div>
            <div id={style.description}>
              <h3>Realizar donaciones</h3>
              <p>
                En el caso de que quieras realizar algún aporte a tus compañeros
                que te ayudaron con esa duda que tenias o que hicieron un post
                tan destacado que merece una recompensa, puedes realizar una
                donación a ese usuario al que quieres apoyar mediante el uso de
                nuestro botón para donar un cafe. Ah! Y tu también puedes
                recibir donaciones de tus compañeros!!!
              </p>
            </div>
            <div>
              <img src={donations} alt="donations" />
            </div>
          </div>
        </section>
        <footer id={style.footer}>
          <h2>Que esperas para unirte?</h2>
          <Link to="/login">
            <button 
              className={style.act_btn2}
              onClick={handleActionChange}
              value="signUp"
            >
              Registrarse
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
}
