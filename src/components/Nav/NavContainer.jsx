import React from "react";
import s from './Nav.module.css'
import NavItem from "./NavItem/NavItem";
import Friends from "./Friends/Friend";
import {connect} from "react-redux";
import Nav from "./Nav";

let mapStateToProps = (state) => {
    return {
        navItem: state.nav.navItem,
        friendsItem: state.nav.friends
    }
}
let mapDispatchToProps = (dispatch) => {
    return {}
}
const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default NavContainer;
