import react from 'react';
import { Follows } from './followExample';
import './followBar.scss';

export default function FollowBar() {
  let nuevo: Follows[] = [
    { name: 'Alguien', avatar: 'https://avatars.githubusercontent.com/u/9113740?v=4' },
    { name: 'Alejandro', avatar: 'https://avatars.githubusercontent.com/u/78025342?v=4' },
    { name: 'Rei', avatar: 'https://avatars.githubusercontent.com/u/68031974?v=4' },
  ];
  interface Estilos {
    background: string;
  }

  function estilado(entrada: any) {
    let estilos: Estilos = {
      background: `url(${entrada}) center/contain no-repeat`,
    };
    return estilos;
  }

  let prueba;

  return (
    <div>
      {nuevo &&
        nuevo.map((x) => (
          <div className="user" key={x.name}>
            <p>{x.name}</p>
            <div className="image" style={(prueba = estilado(x.avatar))}></div>
          </div>
        ))}
    </div>
  );
}
