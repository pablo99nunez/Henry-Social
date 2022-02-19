import { IUser } from "../../../../src/models/User";
import { GET_USER, IAction, IS_FOLLOWING } from "../actions/actions";

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
        case IS_FOLLOWING: {
            return {
                ...state,
                user: {
                    ...state.user,
                    isFollowing: action.payload,
                },
            };
        }

        default:
            return state;
    }
}
