import { IUser } from "../../../../src/models/User";
import { IPost } from "../../../../src/models/Post";
import {
  FOLLOW_USER,
  GET_POST,
  GET_POSTS,
  GET_PROFILE,
  GET_USER,
  GET_USERS,
  GET_USERNAMES,
  IAction,
  LIKE_POST,
  MAKE_ADMIN,
  SEE_NOTIFICATION,
  SIGN_OUT,
} from "../actions/actions";

export interface IState {
  user: IUser;
  profile: IUser;
  posts: IPost[];
  post: IPost;
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
    case GET_USERNAMES: {
      return {
        ...state,
        usernames: action.payload
      }
    }
    case GET_USERS: {
      return {
        ...state,
        users: action.payload
      }
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
    case GET_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case GET_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }
    case LIKE_POST: {
      return {
        ...state,
        posts: state.posts.map((e) => {
          return e._id === action.payload._id ? action.payload : e;
        }),
      };
    }
    case MAKE_ADMIN: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case SEE_NOTIFICATION: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
}
