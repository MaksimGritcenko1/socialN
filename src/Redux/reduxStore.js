import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import navReducer from "./nav-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import UsersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    nav: navReducer,
    news: newsReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer //import { reducer as formReducer } from 'redux-form'
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)
));

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare))
window.store = store
export default store
