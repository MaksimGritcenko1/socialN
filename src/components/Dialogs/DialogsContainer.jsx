import React from 'react'
import {messageValueActionCreator, newMessageActionCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        messageValue: state.dialogsPage.messageValue,
        messages: state.dialogsPage.messages,
        dialog: state.dialogsPage.dialog,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (messageValue) => {
            dispatch(newMessageActionCreator(messageValue))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)