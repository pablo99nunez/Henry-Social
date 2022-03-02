import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../../../src/services/firebase/firebase";
import { getUser } from "../redux/actions/actions";
import { socket } from "../App";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        dispatch(getUser(user.email));
        socket.connect();
      } else {
        navigate("/login");
        socket.disconnect();
      }
    });
  }, []);
}
