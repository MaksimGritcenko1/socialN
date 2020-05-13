import s from "./../../Nav.module.css";
import React from "react";

const FriendsItem = (props) => {
    return (
        <div className={s.navMessagesFriend}>
            <img className={s.friendImg}
                 src={props.navInfo.picture}
                 alt=""/>
            <span>{props.navInfo.name}</span>
        </div>
    )
}

export default FriendsItem