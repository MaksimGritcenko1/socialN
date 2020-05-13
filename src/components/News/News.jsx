import React from "react";
import NewsItem from "./MyNews/MyNews";
import {Field, reduxForm} from "redux-form";
import styles from './News.module.css'


const News = (props) => {

    let newsItems = props.newsMessages.map(item => <NewsItem message={item.newsText} key={item.id}/>)

    let addNews = (values) => {
        props.addNews(values.newsBody)
    }

    return (
        <div className={styles.news}>
            <div>{newsItems}</div>
            <NewsFormRedux onSubmit={addNews}/>
        </div>
    )
}

const NewsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' name='newsBody' placeholder='what`s new today?'/>
            <button>Add News</button>
        </form>
    )
}

const NewsFormRedux = reduxForm({form: 'newsForm'})(NewsForm)

export default News;
