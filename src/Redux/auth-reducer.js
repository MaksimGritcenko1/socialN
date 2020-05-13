import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA = 'auth/SET_CAPTCHA'


const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    url: null //Captcha. if null, captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
})

export const setCaptcha = (url) => ({
    type: SET_CAPTCHA,
    payload: {url}
})

export const getUserDataThunkCreator = () => {

    return async (dispatch) => {
        //return for initializing. any then returns promise
        // and this promise we return in thunk.
        // then we use this returned promise in app-reducer
        let response = await authAPI.me()

        if (response.data.resultCode == 0) {
            let {id, login, email} = response.data.data
            dispatch(setUserData(id, login, email, true))
        }
    }

}

export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getUserDataThunkCreator())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        ///special action creator from ReduxForm
        dispatch(stopSubmit('login', {_error: error}))
    }
}


export const logoutThunk = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                //after logout we must set the auth data to null in state
                dispatch(setUserData(null, null, null, false))
            }
        })
}

export const getCaptchaUrl = () => async (dispatch) => {
    const url = await securityAPI.getCaptcha()
    dispatch(setCaptcha(url.data.url))
}

export default authReducer


