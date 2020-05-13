import s from "./../Nav.module.css";
import React from "react";
import FriendsItem from "./FriendsItem/FriendsItem";


const Friends = (props) => {

    let friends = props.friendsItem.map(item => <FriendsItem navInfo={item} key={item.id}/>)
    return (
        <div className={s.navMessages}>
            <div className={s.navMessagesTitle}>Friends</div>
            {friends}
        </div>
    )
}

export default Friends