import axios from "axios";

export interface IAction {
    type: string;
    payload: any;
}

export const GET_USER = "GET_USER";
export const IS_FOLLOWING = "IS_FOLLOWING";

export function getUser(email: string) {
    return function (dispatch: Function) {
        axios
            .post("https://henry-social-back.herokuapp.com/findUser", { email })
            .then((res) => {
                return dispatch({ type: GET_USER, payload: res.data });
            });
    };
}

export function isFollowing(seguidor: string, seguido: string) {
    return function (dispatch: Function) {
        axios
            .post("https://henry-social-back.herokuapp.com/findUser", {
                username: seguidor,
            })
            .then((Seguidor) => {
                if (Seguidor.data.following.find((e: string) => e === seguido))
                    return dispatch({ type: IS_FOLLOWING, payload: true });
                else return dispatch({ type: IS_FOLLOWING, payload: false });
            });
    };
}
