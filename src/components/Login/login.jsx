import React from 'react'
import {reduxForm} from 'redux-form';
import {createField, Inputarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from './../common/FormControls/FormControls.module.css'
import s from './login.module.css'
import commonStyles from './../common/commonStyles/commonStyles.module.css'


const maxLength30 = maxLengthCreator(30)
const LoginForm = ({error, handleSubmit, captcha}) => {
    return (

        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Inputarea, [required, maxLength30])}
            {createField('Password', 'password', Inputarea, [required, maxLength30], {type: 'password'})}
            {createField(null, 'checkbox', Inputarea, [], {type: 'checkbox'}, 'Remember Me')}

            {error && <div className={styles.formError}>
                {error}
            </div>
            }
            {captcha && <div>
                <img src={captcha}/>
                {createField('Enter the symbols', 'captcha', Inputarea, [required])}
            </div>}
            <div>
                <button className={commonStyles.button}>Submit</button>
            </div>
        </form>

    )
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)


const Login = ({loginThunk, isAuth, captcha}) => {
    const onSubmit = (formData) => {
        loginThunk(formData.email, formData.password, formData.checkbox, formData.captcha)
    }
    if (isAuth) return <Redirect to={'/profile'}/>
    return (
        <div className={s.loginForm}>
            <h1>Log in</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.url
})

export default connect(mapStateToProps, {loginThunk})(Login)