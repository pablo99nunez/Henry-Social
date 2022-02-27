import "./PostDetail.scss";
import { useEffect } from "react";
import { useParams } from "react-router";
import { IState } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { clear, getPost } from "../../redux/actions/actions";

import Post from "../../Components/Post/Post";
import Comments from "../../Components/Comments/Comments";
import FollowBar from "../../Components/FollowBar/FollowBar";
import NavSearch from "../../Components/NavSearch/NavSearch";
import SideMessages from "../../Components/SideMessages/SideMessages";

export default function PostDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector((state: IState) => state.post);

    useEffect(() => {
        if (id) {
            dispatch(getPost(id));
            return () => dispatch(clear("post"));
        }
    }, [id]);

    return (
        <>
            <NavSearch />
            <div id="postDetail">
                <div id="content">
                    <div id="follow-bar">
                        <FollowBar />
                    </div>
                    <div id="boxPost">
                        <div id="post">
                            {details && <Post post={details} />}
                            {console.log("Detalles Post: ", details)}
                            <Comments />
                        </div>
                    </div>

                    <div id="messages">
                        <SideMessages />
                    </div>
                </div>
            </div>
        </>
    );
}
