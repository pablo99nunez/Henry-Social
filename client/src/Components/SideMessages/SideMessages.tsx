import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../Hooks/useUser";
import { getOnlineUsers, openChat } from "../../redux/actions/actions";
import { IState } from "../../redux/reducer";
import Avatar from "../Avatar/Avatar";
import style from "./SideMessages.module.scss";

const SideMessages = () => {
  const socket = useSelector((state: IState) => state.socket);
  const users = useSelector((state: IState) => state.usersOnline);
  const dispatch = useDispatch();
  const user = useUser();
  useEffect(() => {
    socket?.on("get_users", (usersSocket) => {
      dispatch(getOnlineUsers(usersSocket));
    });
  }, [socket]);

  const usersConnect = users.filter(e => e.userId !== user?._id) || []

  return usersConnect.length ?  (
    <aside className={style.aside_messages}>
      <h2>Usuarios Conectados</h2>
      <div className={style.aside_resume_messages}>
        {usersConnect?.map(
          (e: any, i: number) =>
            <div
              key={i}
              className={style.user}
              onClick={() => dispatch(openChat(e.name, e.userId, true))}
            >
              <Avatar avatar={e.avatar}/>
              <h3> {e.name} </h3>
            </div>
        )}
      </div>
    </aside>
  ) : <></>
};

export default SideMessages;
