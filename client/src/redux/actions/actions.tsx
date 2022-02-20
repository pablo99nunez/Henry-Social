import axios from "axios";
export const GET_USER = "GET_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const SIGN_OUT = "SIGN_OUT";
export const GET_PROFILE = "GET_PROFILE";

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
                console.log("DISPATCH:", res);
                return dispatch({ type: GET_PROFILE, payload: res.data });
            });
    };
}
