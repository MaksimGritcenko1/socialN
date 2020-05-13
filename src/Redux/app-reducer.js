import {getUserDataThunkCreator} from "./auth-reducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED'
const ADD_ERROR = 'app/ADD_ERROR'
const DELETE_ERROR = 'app/DELETE_ERROR'


const initialState = {
    initialized: false,
    globalError: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        case ADD_ERROR:
            return {
                ...state,
                globalError: action.error
            }
        case DELETE_ERROR:
            return {
                ...state,
                globalError: null
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: SET_INITIALIZED})
export const addGlobalError = (error) => ({type: ADD_ERROR, error})
export const deleteError = () => ({type: DELETE_ERROR,})


export const addError = (error) => (dispatch) => {
    dispatch(addGlobalError(error))

    setTimeout(() => {
        dispatch(deleteError())
    }, 10000)
}

export const initializedApp = () => (dispatch) => {
    //in getUserData thunk in auth-reducer we returned promise
    let promise = dispatch(getUserDataThunkCreator())
    //we must dispatch initializedSuccess exactly after dispatch above
    //because there is async func which will last some time
    //we are initialized only after the dispatches above

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}


export default appReducer


