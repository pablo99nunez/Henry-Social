import axios from 'axios';

export interface IAction {
  type: string;
  payload: any;
}

export const GET_USER = 'GET_USER';

export function getUser(email: string) {
  return function (dispatch: Function) {
    axios.post('http://localhost:3001/findUser', { email }).then((res) => {
      return dispatch({ type: GET_USER, payload: res.data });
    });
  };
}
