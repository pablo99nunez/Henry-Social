/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";
// import { func } from "joi";
import { IPost } from "../../../../src/models/Post";
import { IUser } from "../../../../src/models/User";
export const GET_USER = "GET_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const SIGN_OUT = "SIGN_OUT";
export const GET_PROFILE = "GET_PROFILE";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const LIKE_POST = "LIKE_POST";
export const MAKE_ADMIN = "MAKE_ADMIN";
export const SEE_NOTIFICATION = "SEE_NOTIFICATION";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_LIKE = "FILTER_BY_LIKE";
export const FILTER_BY_FOLLOW = "FILTER_BY_FOLLOW";
export const ORDER_BY = "ORDER_BY";
export const SEARCH_USERS = "SEARCH_USERS";
export const FILTER_BY_TAG = "FILTER_BY_TAG";
export const SET_SOCKET = "SET_SOCKET";
export const GET_ONLINE_USERS = "GET_ONLINE_USERS";
export const OPEN_CHAT = "OPEN_CHAT";
export const CLOSE_CHAT = "CLOSE_CHAT";

export interface IAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export function getUser(email: string) {
  return (dispatch: Function) => {
    axios.post("/findUser", { email }).then((res) => {
      return dispatch({ type: GET_USER, payload: res.data });
    });
  };
}

export function editUser(_id: string, changes: any) {
  return async (dispatch: Function) => {
    const user = await axios.put("/user", { _id, changes }).then((e) => e.data);
    dispatch({ type: GET_USER, payload: user });
    return Promise.resolve();
  };
}

export function signOut() {
  return (dispatch: Function) => {
    return dispatch({ type: SIGN_OUT });
  };
}

export function followUser(seguidor: string, seguido: string) {
  return (dispatch: Function) => {
    axios
      .post("/follow", {
        seguidor,
        seguido,
      })
      .then((res) => {
        return dispatch({
          type: FOLLOW_USER,
          payload: {
            seguidor: res.data.userSeguidor,
            seguido: res.data.userSeguido,
          },
        });
      });
  };
}

export function getProfile(username: string) {
  return (dispatch: Function) => {
    axios.post("/findUser", { username }).then((res) => {
      return dispatch({ type: GET_PROFILE, payload: res.data });
    });
  };
}

export function getPosts(_id: string | undefined = "") {
  return (dispatch: Function) => {
    _id
      ? axios.post("/posts", { _id }).then((res) => {
          return dispatch({ type: GET_POSTS, payload: res.data });
        })
      : axios.post("/posts").then((res) => {
          return dispatch({ type: GET_POSTS, payload: res.data });
        });
  };
}

export function filterBySection(typePost: string) {
  return async (dispatch: Function) => {
    try {
      const res = await axios.post("/posts", {
        props: {
          typePost,
        },
      });
      return dispatch({
        type: FILTER_BY_TYPE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByTag(tag: string): Function {
  return async (dispatch: Function): Promise<any> => {
    try {
      const res = await axios.post("/posts", { tag });
      return dispatch({
        type: FILTER_BY_TAG,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchUsers(username: string) {
  return async (dispatch: Function) => {
    try {
      const res = await axios.get(`/users?username=${username}`);
      return dispatch({
        type: SEARCH_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPost(id: string) {
  return (dispatch: Function) => {
    axios.get("/post/" + id).then((post) => {
      if (post.data) {
        axios.get("/comments/" + post.data._id).then((comments) => {
          return dispatch({
            type: GET_POST,
            payload: { post: post.data, comments: comments.data },
          });
        });
      } else {
        return dispatch({
          type: GET_POST,
          payload: { post: { _id: false }, comments: [] },
        });
      }
    });
  };
}

export function clear(page: string) {
  return (dispatch: Function) => {
    return dispatch({ type: page === "profile" ? CLEAR_PROFILE : CLEAR_POST });
  };
}

export function likePost(post: IPost, user: IUser) {
  return (dispatch: Function) => {
    axios
      .post("/like", {
        _id: post._id,
        author: user,
      })
      .then((e) => dispatch({ type: LIKE_POST, payload: e.data }));
  };
}

export function makeAdmin(username: string) {
  return (dispatch: Function) => {
    axios
      .post("/admin", { username })
      .then((e) => dispatch({ type: MAKE_ADMIN, payload: e.data }));
  };
}

export function seeNotification(id: number, userId: string) {
  return (dispatch: Function) => {
    axios.put("/notification", { id, userId }).then((e) => {
      return dispatch({ type: SEE_NOTIFICATION, payload: e.data });
    });
  };
}

export function filterByLike(id: string) {
  return (dispatch: Function) => {
    axios
      .post("/posts", {
        props: {
          nLikes: { $in: [id] },
        },
      })
      .then((e) => {
        return dispatch({ type: FILTER_BY_LIKE, payload: e.data });
      });
  };
}

export function filterByOrder(order: string) {
  return async (dispatch: Function) => {
    return dispatch({ type: ORDER_BY, payload: { order } });
  };
}

export function filterByFollow() {
  return async (dispatch: Function) => {
    return dispatch({ type: FILTER_BY_FOLLOW });
  };
}
export function setSocket() {
  return (dispatch: Function) => dispatch({ type: SET_SOCKET });
}
export function getOnlineUsers(users: any[]) {
  return (dispatch: Function) =>
    dispatch({ type: GET_ONLINE_USERS, payload: users });
}

export function openChat(username: string, name: string, userB: string) {
  console.log(userB);
  return (dispatch: Function) =>
    dispatch({ type: OPEN_CHAT, payload: { username, name, userB } });
}

export function closeChat(username: string) {
  return (dispatch: Function) =>
    dispatch({ type: CLOSE_CHAT, payload: username });
}
