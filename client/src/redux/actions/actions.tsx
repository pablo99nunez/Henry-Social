import axios from "axios";

export interface IAction {
  type: string;
  payload: any;
}

export const GET_USER = "GET_USER";

export function getUser(email: string) {
  return function (dispatch: Function) {
    axios
      .post("https://henry-social-back.herokuapp.com/findUser", { email })
      .then((res) => {
        return dispatch({ type: GET_USER, payload: res.data });
      });
  };
}
