import {usersAPI} from "../API/api";

const FOLLOW = 'users/TOGGLE_FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const CHANGE_CURRENT_PAGE = 'users/CHANGE_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const CHECK_FETCHING = 'users/CHECK_FETCHING'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'


const initialState = {
    users: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    //BUTTON DISABLED
    followingInProgress: []
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        //Map for changing something inside arrays, which will come in json
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })

            }
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }
        case CHANGE_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case CHECK_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        //BUTTON DISABLED
        case TOGGLE_IS_FETCHING:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state
    }


}
////ACTION CREATORS
export const followSuccess = (userID) => ({type: FOLLOW, userID})
export const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID})
export const setUsers = (users) => ({type: SET_USERS, users})
export const changeCurrentPage = (currentPage) => ({type: CHANGE_CURRENT_PAGE, currentPage})
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
export const checkFetching = (isFetching) => ({type: CHECK_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FETCHING, isFetching, userId})

/////THUNK CREATORS
export const getUsersThunkCreator = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(checkFetching(true))
        dispatch(changeCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)

        dispatch(checkFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))

    }
}

//common function to avoid doubling of the code
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

//БЫЛО ДО ЭТОГО
// const follow = (userId) = async (dispatch) => {
//     dispatch(toggleFollowingProgress(true, userId))
//     let response = await userAPI.follow(userId)
//
//     if (response.data.resultCode == 0) {
//         dispatch(followSuccess(userId))
//     }
//     dispatch(toggleFollowingProgress(false, userId))
// }

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => {

    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = unfollowSuccess
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export default UsersReducer


