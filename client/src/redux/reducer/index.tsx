import { IUser } from "../../../../src/models/User";
import { IPost } from "../../../../src/models/Post";
import {
  FILTER_BY_LIKE,
  FOLLOW_USER,
  GET_POST,
  CLEAR_POST,
  CLEAR_PROFILE,
  GET_POSTS,
  GET_PROFILE,
  GET_USER,
  IAction,
  LIKE_POST,
  MAKE_ADMIN,
  SEE_NOTIFICATION,
  SIGN_OUT,
  FILTER_BY_TYPE,
  SEARCH_USERS,
} from "../actions/actions";

export interface IState {
  user: IUser | null;
  profile: IUser;
  posts: IPost[];
  post: IPost;
  comments: Comment[];
  Users: IUser[];
}

const initialState = {
  user: null,
  profile: {},
  Users: {},
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
    case GET_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case SEARCH_USERS: {
      return {
        ...state,
        Users: action.payload,
      };
    }
    case FILTER_BY_TYPE: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case GET_POST: {
      return {
        ...state,
        post: action.payload.post,
        comments: action.payload.comments,
      };
    }
    case CLEAR_POST: {
      return {
        ...state,
        post: null,
        comments: null,
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        profile: null,
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
    case FILTER_BY_LIKE: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default:
      return state;
  }
}
