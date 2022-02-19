import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IState } from "../redux/reducer";
import { isFollowing } from "../../../src/Routes/UserRoutes";

export default function useUser() {
    const user = useSelector((state: IState) => state.user);

    if (user) return user;
    else return null;
}
