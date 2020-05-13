import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    getUsersThunkCreator
} from "../../Redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalCount,
    getUsers
} from "../../Redux/users-selectors";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    changeCurrentPage = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
        // this.props.changeCurrentPage(pageNumber)... БЫЛО
        // this.props.checkFetching(true)
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.checkFetching(false)
        //         this.props.setUsers(data.items)
        //     })
    }

    render() {
        return (
            <>
                <div>{this.props.isFetching ? <Preloader/> : null}</div>
                <Users
                    totalCount={this.props.totalCount}
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    changeCurrentPage={this.changeCurrentPage}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    isFetching={this.props.isFetching}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>)
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalCount: getTotalCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userID) => {
//             dispatch(followAC(userID))
//         },
//         unfollow: (userID) => {
//             dispatch(unfollowAC(userID))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         changeCurrentPage: (pageNumber) => {
//             dispatch(changeCurrentPageAC(pageNumber))
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setTotalCountAC(totalCount))
//         },
//         checkFetching: (isFetching) => {
//             dispatch(checkFetchingAC(isFetching))
//         }
//     }
// }

const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    getUsersThunkCreator
})(UsersAPIComponent)

export default UsersContainer;
