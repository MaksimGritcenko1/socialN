import {createSelector} from "reselect";
///Simple selector for complicated selector
const getUsersSelector = (state) => {
    return state.usersPage.users
}
// Reselect library, we creating simple selectors for usage in complicated ones
// The second parameter => the thing taken in simple selector
export const getUsers = createSelector(getUsersSelector,
    (users/*, isFetching*/) => {
        return users.filter(u => true)
    })

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}