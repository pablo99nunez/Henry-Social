import { useSelector } from "react-redux";
import { IState } from "../redux/reducer";
import { auth } from "../../../src/services/firebase/firebase";

export default function useUser() {
  const user = useSelector((state: IState) => state.user);
  if(auth.currentUser?.emailVerified) return user;
  else return null;
}
