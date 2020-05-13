import {NavLink} from "react-router-dom";
import s from "../Nav.module.css";
import React from "react";


const NavItem = (props) => {

    return (
        <div>
            <NavLink
                activeClassName={s.active}
                className={s.item} to={`/${props.navItem.address}`}>{props.navItem.val}</NavLink>
        </div>
    )
}

export default NavItem