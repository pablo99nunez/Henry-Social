import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { INotification } from "../../../../src/models/User";
import useUser from "../../Hooks/useUser";
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
  const user = useUser();
  const handleClick = () => {
    if (user?._id) {
      dispatch(seeNotification(id, user._id));
      navigate(detail.link);
    }
  };
  return (
    <div
      className={`${styles.notification} ${detail?.new && styles.active}`}
      onClick={handleClick}
    >
      <Avatar avatar={detail.avatar}></Avatar>
      <div>
        <h3>{detail?.content}</h3>
      </div>
    </div>
  );
}
