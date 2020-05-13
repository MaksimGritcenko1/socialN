import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addNewPost, like} from "../../../Redux/profile-reducer";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        textValue: state.profilePage.textValue
    }
}

const MyPostsContainer = connect(mapStateToProps, {addNewPost, like})(MyPosts)

export default MyPostsContainer;
