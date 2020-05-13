import {profileAPI, usersAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST'
const SET_PROFILE = 'profile/SET_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const UPDATE_PROFILE_DATA_SUCCESS = 'profile/UPDATE_PROFILE_DATA_SUCCESS'
const UPDATE_PROFILE_DATA_FAILED = 'profile/UPDATE_PROFILE_DATA_FAILED'
const LIKE = 'profile/LIKE'


const initialState = {
    posts: [
        {id: 1, post: 'Hello, how are you?', likes: 5},
        {id: 2, post: 'Here is my new post!', likes: 10},
        {id: 3, post: 'Here is my new post!', likes: 0},
        {id: 4, post: 'Here is my new post!', likes: 20}
    ],
    profile: null,
    status: '',
    updateProfileData: null //true / false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, post: action.newPostBody, likes: 0}]
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:  // Pushing new photos
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case UPDATE_PROFILE_DATA_SUCCESS:
            //two cases for turning on/off the editMode in profile
            return {
                ...state,
                updateProfileData: true
            }
        case UPDATE_PROFILE_DATA_FAILED:
            return {
                ...state,
                updateProfileData: false
            }
        case LIKE:
            return {
                ...state,
                posts: state.posts.map(p => {
                    if (action.postId === p.id) {
                        return {...p, likes: p.likes + 1}
                    }
                    return p
                })
            }
        default:
            return state
    }


}


export const addNewPost = (newPostBody) => ({type: ADD_POST, newPostBody})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})
export const setStatusAC = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const updateProfileDataSuccess = () => ({type: UPDATE_PROFILE_DATA_SUCCESS})
export const updateProfileDataFailed = () => ({type: UPDATE_PROFILE_DATA_FAILED})
export const like = (postId) => ({type: LIKE, postId})


export const getProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let data = await usersAPI.getProfile(userId)

        dispatch(setProfile(data))

    }
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)

    dispatch(setStatusAC(response.data))

}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)


    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    } else if (response.data.resultCode === 1) {
        return Promise.reject(response.data.messages[0])
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.updatePhoto(file)

    if (response.data.resultCode === 0) {
        //in json we get only photos object from the server
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profileData) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profileData)

    if (response.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId))
        //     .then(() => {
        //     dispatch(updateProfileDataSuccess())
        // })
    } else {
        //stopSubmit special action from redux form. stops the work of the form
        // delivers a common error or error for special Field depending on the key in the object below
        let error = response.data.messages[0].split('->', 2)
        if (error[0] === 'Invalid url format (Contacts') {
            const errorField = error[1].slice(0, (error[1].length - 1)).toLowerCase()


            //square brackets!!!!
            dispatch(stopSubmit('profile-form', {"contacts": {[errorField]: response.data.messages[0]}}))
            //for common error
            // dispatch(stopSubmit('profile-form', {_error: response.data.messages[0] }))
            return Promise.reject(response.data.messages[0])
        }

        // dispatch(updateProfileDataFailed())
    }
}

export default profileReducer


