import useUser from "./useUser";

export default function useNotifications() {
  const user = useUser();
  return user?.notifications;
}
