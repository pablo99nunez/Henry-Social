import { useEffect, useState } from "react";
import useUser from "./useUser";

export default function useNotifications() {
  const user = useUser();
  const [news, setNews] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.notifications.find((e) => e.new)) {
        setNews(true);
      } else setNews(false);
    }
  }, [user]);
  return [user?.notifications, news];
}
