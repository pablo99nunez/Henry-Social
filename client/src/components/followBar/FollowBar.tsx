import react from "react";
import { Follows } from "./followExample";
import "./followBar.scss";

export default function FollowBar() {
  let seguidos: Follows[] = [
    {
      name: "Alguien",
      avatar: "https://avatars.githubusercontent.com/u/9113740?v=4",
    },
    {
      name: "Alejandro",
      avatar: "https://avatars.githubusercontent.com/u/78025342?v=4",
    },
    {
      name: "Rei",
      avatar: "https://avatars.githubusercontent.com/u/68031974?v=4",
    },
  ];

  return (
    <div className="followBar">
      <h2>Siguiendo</h2>
      <div className="users">
        {seguidos &&
          seguidos.map((x) => (
            <div className="user" key={x.name}>
              <p>{x.name}</p>
              <img src={x.avatar} alt="user avatar" />
            </div>
          ))}
      </div>
      <h4>Ver mas...</h4>
    </div>
  );
}
