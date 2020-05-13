import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getStatus,
    savePhoto, saveProfile,
    updateStatus
} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getGlobalError,
    getIsAuth,
    getProfile,
    getStatusSelector,
    getUpdateProfileData,
    getUserId
} from "../../Redux/profile-selectors";
import {deleteError} from "../../Redux/app-reducer";


class ProfileContainer extends React.Component {
    //getting rid of duplicating the code in componentDidMount and componentDidUpdate
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.userId
            //One more option of redirect. the old feature. better to use Redirect component
            // because we interfering in component lifecycle.
            // we can do like that if we need a redirect after the button push, but better to do it through state
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatus(userId)
    }


    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return <Profile
            {...this.props}
            profile={this.props.profile}
            updateStatus={this.props.updateStatus}
            status={this.props.status}
            updateProfileData={this.props.updateProfileData}
            saveProfile={this.props.saveProfile}
            isOwner={!this.props.match.params.userId}
            //if in URL no id, isOwner becomes true
            savePhoto={this.props.savePhoto}
            globalError={this.props.globalError}
            deleteError={this.props.deleteError}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        isAuth: getIsAuth(state),
        status: getStatusSelector(state),
        userId: getUserId(state),
        updateProfileData: getUpdateProfileData(state),
        globalError: getGlobalError(state),

    }
}


export default compose(
    withRouter,
    connect(mapStateToProps, {getProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfile, deleteError}),
    withAuthRedirect
)(ProfileContainer)
