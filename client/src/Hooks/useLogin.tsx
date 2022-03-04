import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../../../src/services/firebase/firebase";
import { getUser } from "../redux/actions/actions";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        if(user.emailVerified) {
          dispatch(getUser(user.email));
        } else navigate("/verification");
      } else {
        navigate("/login");
      }
    });
  }, []);
}
