import axios from "axios";
import { IPost } from "../../../../src/models/Post";
import { IUser } from "../../../../src/models/User";
export const GET_USER = "GET_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const SIGN_OUT = "SIGN_OUT";
export const GET_PROFILE = "GET_PROFILE";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const LIKE_POST = "LIKE_POST";

export interface IAction {
    type: string;
    payload: any;
}

export function getUser(email: string) {
    return function (dispatch: Function) {
        axios.post("http://localhost:3001/findUser", { email }).then((res) => {
            return dispatch({ type: GET_USER, payload: res.data });
        });
    };
}
export function signOut() {
    return function (dispatch: Function) {
        return dispatch({ type: SIGN_OUT });
    };
}

export function followUser(seguidor: string, seguido: string) {
    return function (dispatch: Function) {
        axios
            .post("http://localhost:3001/follow", {
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
    return function (dispatch: Function) {
        axios
            .post("http://localhost:3001/findUser", { username })
            .then((res) => {
                return dispatch({ type: GET_PROFILE, payload: res.data });
            });
    };
}

export function getPosts() {
    return function (dispatch: Function) {
        axios.get("http://localhost:3001/posts").then((res) => {
            return dispatch({ type: GET_POSTS, payload: res.data });
        });
    };
}
export function getPost(id: String) {
    return function (dispatch: Function) {
        axios.get("http://localhost:3001/post/" + id).then((res) => {
            return dispatch({ type: GET_POST, payload: res.data });
        });
    };
}
export function likePost(post: IPost, user: IUser) {
    return (dispatch: Function) => {
        axios
            .post("http://localhost:3001/like", {
                _id: post._id,
                author: user,
            })
            .then((e) => dispatch({ type: LIKE_POST, payload: e.data }));
    };
}
