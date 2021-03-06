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
  FILTER_BY_TAG,
  SET_SOCKET,
  GET_ONLINE_USERS,
  OPEN_CHAT,
  CLOSE_CHAT,
  SET_POST_EDIT,
  SET_ACTIVE_SECTION,
} from "../actions/actions";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { io, Socket } from "socket.io-client";

export interface IState {
  user: IUser | null;
  profile: IUser | null;
  posts: IPost[];
  results: IPost[];
  post: IPost | null;
  postEdit: any;
  comments: Comment[];
  Users: IUser[];
  socket: Socket | null;
  filter: string;
  usersOnline: any[];
  chats: any[];
  activeSection: string;
}

const initialState = {
  user: null,
  profile: null,
  filter: "",
  posts: [],
  results: [],
  post: null,
  postEdit: null,
  comments: [],
  Users: [],
  socket: null,
  usersOnline: [],
  chats: [],
  activeSection: 'all',
} as IState;

const urlBackend = import.meta.env.PROD
  ? "https://henry-social-back.herokuapp.com"
  : "http://localhost:3001";

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
      let results = action.payload.sort((a: IPost, b: IPost) => {
        return new Date(a.postTime) < new Date(b.postTime) ? 1 : -1;
      });
      if (state.user?.role === "Estudiante") {
        results = results.filter((e: IPost) => {
          if (e.typePost === "pregunta") {
            return e.respuesta;
          } else return true;
        });
      }
      return {
        ...state,
        posts: action.payload,
        results,
        filter: "all",
      };
    }

    case SEARCH_USERS: {
      return {
        ...state,
        Users: action.payload,
      };
    }

    case FILTER_BY_TYPE: {
      let results = action.payload.data.sort((a: IPost, b: IPost) => {
        return new Date(a.postTime) < new Date(b.postTime) ? 1 : -1;
      });
      if (state.user?.role === "Estudiante") {
        results = results.filter((e: IPost) => {
          if (e.typePost === "pregunta") {
            return e.respuesta;
          } else return true;
        });
      }
      return {
        ...state,
        results,
        filter: action.payload.type,
      };
    }

    case FILTER_BY_TAG: {
      return {
        ...state,
        results: action.payload,
      };
    }

    case SET_ACTIVE_SECTION: {
        return {
          ...state, 
          activeSection: action.payload,
        }
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
        case "Pendientes": {
          result = result?.filter((e: IPost) => !e.respuesta);
        }
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
              return state.user?.following?.includes(e.author.username);
            return null;
          })
          .sort((a: IPost, b: IPost) => {
            return new Date(a.postTime) < new Date(b.postTime) ? 1 : -1;
          }),
      };
    }

    case SET_SOCKET: {
      return {
        ...state,
        socket: io(urlBackend, {
          autoConnect: false,
        }),
      };
    }

    case GET_ONLINE_USERS: {
      return {
        ...state,
        usersOnline: action.payload,
      };
    }

    case OPEN_CHAT: {
      return {
        ...state,
        chats: state.chats.some((e) => e.userB === action.payload.userB)
          ? state.chats
          : [...state.chats, action.payload],
      };
    }
    case CLOSE_CHAT: {
      return {
        ...state,
        chats: state.chats.filter((e) => e.userB !== action.payload),
      };
    }

    case SET_POST_EDIT: {
      return {
        ...state,
        postEdit: action.payload,
      };
    }

    default:
      return state;
  }
}
