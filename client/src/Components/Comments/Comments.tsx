import "./Comments.scss";
import Comment from "../Comment/Comment";
import { useSelector } from "react-redux";
import { IState } from "../../redux/reducer";

export default function Comments() {
  const comments = useSelector((state: IState) => state.comments);
  return (
    <div className="commentsPost">
      {comments?.map((p, i) => (
        <Comment key={i} data={p} />
      ))}
    </div>
  );
}
