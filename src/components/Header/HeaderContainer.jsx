import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunk} from "../../Redux/auth-reducer";

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header
                {...this.props}
                logout={this.props.logoutThunk}
            />
        )
    }
};

const mapStateTopProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})

export default connect(mapStateTopProps, {logoutThunk})(HeaderContainer);
