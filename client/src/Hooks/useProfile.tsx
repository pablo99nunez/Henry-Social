import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions/actions";

import { IState } from "../redux/reducer";
import useUser from "./useUser";

export const useProfile = (username: string | undefined) => {
  const user = useSelector((state: IState) => state.profile);
  const [isOwner, setisOwner] = useState(false);
  const userLogeado = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    if (username) dispatch(getProfile(username));
  }, []);
  useEffect(() => {
    if (username === userLogeado?.username) {
      setisOwner(true);
    } else setisOwner(false);
  }, [username, userLogeado]);
  useEffect(() => {
    if (username) dispatch(getProfile(username));
  }, [username]);
  return [user, isOwner] as const;
};
