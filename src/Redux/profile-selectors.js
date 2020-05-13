export const getProfile = (state) => {
    return state.profilePage.profile
}
export const getIsAuth = (state) => {
    return state.auth.isAuth
}
export const getStatusSelector = (state) => {
    return state.profilePage.status
}
export const getUserId = (state) => {
    return state.auth.userId
}
export const getUpdateProfileData = (state) => {
    return state.profilePage.updateProfileData
}
export const getGlobalError = (state) => {
    return state.app.globalError
}