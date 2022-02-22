import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { INotification } from "../../../../src/models/User";
import { seeNotification } from "../../redux/actions/actions";
import Avatar from "../Avatar/Avatar";
import styles from "./Notification.module.scss";

type Props = {
  detail: INotification;
  id: number;
};

export default function Notification({ detail, id }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (detail.receptor._id) {
      dispatch(seeNotification(id, detail.receptor._id));
      navigate(detail?.link);
    }
  };
  return (
    <div
      className={`${styles.notification} ${detail?.new && styles.active}`}
      onClick={handleClick}
    >
      <Avatar user={detail?.emisor}></Avatar>
      <div>
        <h3>{detail?.content}</h3>
      </div>
    </div>
  );
}
