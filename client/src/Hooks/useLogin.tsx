import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../../../src/services/firebase/firebase";
import { getUser, setSocket } from "../redux/actions/actions";
import { IState } from "../redux/reducer";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector((state: IState) => state.socket);
  const user = useSelector((state: IState) => state.user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        dispatch(getUser(user.email));
        dispatch(setSocket());
      } else {
        navigate("/login");
        socket?.disconnect();
        socket?.close();
        localStorage.clear();
      }
    });
  }, []);
  useEffect(() => {
    if (user) {
      socket?.connect();
      socket?.emit("add_user", user._id);
    }
  }, [socket, user]);
}
