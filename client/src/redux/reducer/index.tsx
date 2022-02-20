import { IUser } from "../../../../src/models/User";
import {
    FOLLOW_USER,
    GET_PROFILE,
    GET_USER,
    IAction,
    SIGN_OUT,
} from "../actions/actions";

export interface IState {
    user: IUser;
    profile: IUser;
}

const initialState = {
    user: {},
    profile: {},
} as IState;

export default function rootReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case GET_USER: {
            return { ...state, user: action.payload };
        }
        case FOLLOW_USER: {
            return {
                ...state,
                user: action.payload.seguidor,
                profile: action.payload.seguido,
            };
        }
        case SIGN_OUT: {
            return {
                ...state,
                user: null,
            };
        }
        case GET_PROFILE: {
            return {
                ...state,
                profile: action.payload,
            };
        }
        default:
            return state;
    }
}
