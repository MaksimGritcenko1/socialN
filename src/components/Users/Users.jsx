import React from "react";
import styles from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";


let Users = ({totalCount, pageSize, currentPage, changeCurrentPage, ...props}) => {

    return (
        <>
            <div>
                <div className={styles.paginator}>
                    <Paginator totalItemsCount={totalCount}
                               pageSize={pageSize}
                               currentPage={currentPage}
                               changeCurrentPage={changeCurrentPage}
                    />
                </div>
                {
                    props.users.map(u => <div key={u.id} className={styles.userElement}>
                        <User user={u}
                              followingInProgress={props.followingInProgress}
                              unfollow={props.unfollow}
                              follow={props.follow}

                        /></div>)
                }
            </div>
        </>
    )
}


export default Users;
