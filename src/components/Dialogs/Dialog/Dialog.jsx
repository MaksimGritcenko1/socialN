import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";


const Dialog = (props) => {
    return (
        <div className={s.dialog}>
            <div><NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink></div>
        </div>
    )
}

export default Dialog