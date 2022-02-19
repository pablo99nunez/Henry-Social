import { IUser } from "../../../../src/models/User";
import { GET_USER, IAction } from "../actions/actions";

export interface IState {
  user: IUser;
}

const initialState = {
  user: {},
} as IState;

export default function rootReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case GET_USER: {
      return { ...state, user: action.payload };
    }

    default:
      return state;
  }
}
