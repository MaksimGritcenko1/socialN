import React from "react";
import styles from './User.module.css'
import s from './../../common/commonStyles/commonStyles.module.css'

import avatar from '../../../assets/images/avatar.png'
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, unfollow, follow}) => {

    return (
        <>
            <div className={styles.wrapper}>
                <div>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={styles.photo}
                                 src={user.photos.small != null ? user.photos.small : avatar}/>
                        </NavLink>
                    </div>

                </div>
                <div>
                    <div className={styles.name}>
                        <div>name: {user.name}</div>
                        <hr/>
                        {user.status && <div>status: {user.status}</div>}
                    </div>
                    {/*<div>{'user.location.city'}</div>*/}
                    {/*<div>{'user.location.country'}</div>*/}

                    <div>{user.followed
                        ? <button className={s.button} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }
                                  }>Unfollow</button>

                        : <button className={s.button} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }

                                  }>Follow</button>}</div>

                </div>
            </div>
        </>


    )
}


export default User;
