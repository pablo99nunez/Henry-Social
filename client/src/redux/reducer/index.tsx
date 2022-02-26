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
  ORDER_BY,
  FILTER_BY_FOLLOW,
} from "../actions/actions";

export interface IState {
  user: IUser | null;
  profile: IUser;
  posts: IPost[];
  results: IPost[];
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
        results: action.payload.sort((a: IPost, b: IPost) => {
          return new Date(a.postTime) < new Date(b.postTime) ? 1 : -1;
        }),
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
        results: action.payload,
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

    case ORDER_BY: {
      let result = state.results[0] ? [...state.results] : [...state.posts];

      switch (action.payload.order) {
        case "Reciente":
          {
            result = result?.sort((a: IPost, b: IPost) => {
              return new Date(a.postTime) < new Date(b.postTime) ? 1 : -1;
            });
          }
          break;
        case "Relevante":
          {
            result = result?.sort((a: IPost, b: IPost) => {
              return a.nLikes.length < b.nLikes.length ? 1 : -1;
            });
          }
          break;
      }
      return {
        ...state,
        results: result,
      };
    }
    case FILTER_BY_FOLLOW: {
      return {
        ...state,
        results: state.results
          .filter((e: IPost) => {
            if (e.author?.username)
              return state.user.following?.includes(e.author.username);
            return null;
          })
          .sort((a: IPost, b: IPost) => {
            return new Date(a.postTime) < new Date(b.postTime) ? 1 : -1;
          }),
      };
    }

    default:
      return state;
  }
}
