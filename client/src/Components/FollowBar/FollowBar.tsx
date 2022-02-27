import "./followBar.scss"; //Hola bro
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";
import Seguido from "../Seguido/Seguido";
import { useState } from "react";

export default function FollowBar() {
  const [more, setMore] = useState(false);
  const seguidos =
    useSelector((state: IState) => state.profile?.following) || [];

  return (
    <div className="followBar">
      <h2>Siguiendo</h2>
      <div className="users">
        {seguidos?.length ? (
          seguidos.map((u, i) =>
            !more ? (
              i < 3 && <Seguido username={u} key={i} />
            ) : (
              <Seguido username={u} key={i} />
            )
          )
        ) : (
          <h3>No sigues a nadie aún.</h3>
        )}
      </div>
      {seguidos?.length > 3 && !more && (
        <h4 onClick={() => setMore(true)}>Ver mas...</h4>
      )}
    </div>
  );
}
