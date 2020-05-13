import React from "react";
import s from './Post.module.css'
import styles from "./../../../common/commonStyles/commonStyles.module.css"

const Post = props => {


    return (
        <div className={s.item}>
            <div>
                <img className={s.img}
                     src="https://steamuserimages-a.akamaihd.net/ugc/927045848749581623/9C40119AF9CDDEE16EC0B9D40CF04AF15C6AB3C5/"/>
            </div>
            <div>

                <span>{props.message}</span>
                <br/>
                <button onClick={() => props.toLike(props.id)} className={styles.button}>Like!</button>
                <b> {props.like}</b>

            </div>
        </div>
    );
};

export default Post;
