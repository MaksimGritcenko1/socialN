import React from "react";
import "./App.css";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import NewsContainer from "./components/News/NewsContainer";
import NavContainer from "./components/Nav/NavContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {addError, initializedApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./Redux/reduxStore";
import {withSuspense} from "./hoc/withSuspense";


//LAZY ЗАГРУЗКА

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {

    handleAllUncaughtErrors = (PromiseRejectionEvent) => {
        //as PromiseRejectionEvent might be an object and we can`t add object in conditions
        if (typeof PromiseRejectionEvent.reason === "string") {
            //error for status comes here
            this.props.addError(PromiseRejectionEvent.reason)
        } else if (PromiseRejectionEvent.reason.response && PromiseRejectionEvent.reason.response.status == 403) {
            this.props.addError(PromiseRejectionEvent.reason.message)
        }

    }

    componentDidMount() {
        //APP INITIALIZATION. Waiting for response about authentication
        this.props.initializedApp()
        //1)Cathing all the rejected uncaught promises
        window.addEventListener("unhandledrejection", this.handleAllUncaughtErrors)
    }

    //2) we must remove all the listeners set up in componentDidMount
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.handleAllUncaughtErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavContainer/>
                <div className={"app-wrapper-content"}>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/Profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>
                        <Route path='/Dialogs'
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/News'
                               render={() => <NewsContainer/>}/>
                        <Route path='/Music'
                               render={() => <Music/>}/>
                        <Route path='/Settings'
                               render={() => <Settings/>}/>
                        <Route path='/Users'
                               render={() => <UsersContainer/>}/>
                        <Route path='/Login'
                               render={() => <Login/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                    {/*because of Switch we don`t need to indicate the exact path,
                    as it won`t go next after it finds the first appropriate path to show.
                      Firstly, we need to indicate more explicit paths, then more common*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp, addError})
)(App)

// wrap AppContainer component with browser router and provider here instead of index js
// therefore we will be able to test it.
const MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp

