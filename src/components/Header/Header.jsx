import React from "react";
import s from './Header.module.css'
import {NavLink, withRouter} from "react-router-dom";
import logo from './../../assets/images/logo.png'
import cn from 'classnames'
import styles from './../common/commonStyles/commonStyles.module.css'

const Header = (props) => {

    return (
        <header className={s.header}>
            <img
                src={logo}
                alt=""
                style={{width: "70px"}}
            />
            <div className={s.login}>{props.isAuth
                ? <div>{props.login}
                    <button className={cn(s.logoutButton, styles.button)} onClick={props.logout}>Logout</button>
                </div>
                : props.location.pathname === '/login' ||
                <div><NavLink className={s.navLink} to='/login'>Login</NavLink></div>}</div>
        </header>
    );
};

export default withRouter(Header);
