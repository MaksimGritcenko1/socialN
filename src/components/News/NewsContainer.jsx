import React from "react";
import {addNewsCreator} from "../../Redux/news-reducer";
import News from "./News";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        newText: state.news.newText,
        newsMessages: state.news.newsMessages
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addNews: (newsMessageBody) => {
            dispatch(addNewsCreator(newsMessageBody))
        }
    }
}

const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News)

export default NewsContainer;
