import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/actions";
import { IState } from "../redux/reducer";
import useUser from "./useUser";

export default function useNotifications() {
  const user = useUser();
  const socket = useSelector((state: IState) => state.socket);
  const dispatch = useDispatch();
  const [news, setNews] = useState(false);
  useEffect(() => {
    socket?.on("get_notification", () => {
      console.log("getting notis");
      user && dispatch(getUser(user.email));
    });
  }, []);
  useEffect(() => {
    if (user) {
      if (user.notifications?.find((e) => e.new)) {
        setNews(true);
      } else setNews(false);
    }
  }, [user]);
  return [user?.notifications, news];
}
