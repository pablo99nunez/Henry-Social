import { useNavigate } from "react-router";
import { INotification } from "../../../../src/models/User";
import Avatar from "../Avatar/Avatar";
import styles from "./Notification.module.scss";

type Props = {
  detail: INotification;
};
export default function Notification({ detail }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.notification} ${detail?.new && styles.active}`}
      onClick={() => navigate(detail?.link)}
    >
      <Avatar user={detail?.emisor}></Avatar>
      <div>
        <h3>{detail?.content}</h3>
      </div>
    </div>
  );
}
