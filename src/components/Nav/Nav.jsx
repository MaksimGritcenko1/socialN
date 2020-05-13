import React from "react";
import s from './Nav.module.css'
import NavItem from "./NavItem/NavItem";
import Friends from "./Friends/Friend";


const Nav = (props) => {
    let navItems = props.navItem.map(item => <NavItem navItem={item} key={item.id}/>)

    return (
        <nav className={s.nav}>
            {navItems}
            <div className={s.navMessages}>
                <Friends friendsItem={props.friendsItem}/>
            </div>
        </nav>
    );
};

export default Nav;
