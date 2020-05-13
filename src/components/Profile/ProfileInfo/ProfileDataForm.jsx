import {reduxForm} from "redux-form";
import React from "react";
import {createField, Inputarea, Textarea} from "../../common/FormControls/FormControls";
import s from "./ProfileInfo.module.css";
import styles from "../../common/FormControls/FormControls.module.css";
import buttonStyle from "./../../common/commonStyles/commonStyles.module.css";
import cn from 'classnames'

let ProfileDataForm = ({handleSubmit, contacts, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button className={cn(buttonStyle.button, s.button)}>Save</button>
            {error && <div className={styles.formError}>{error}</div>}
            <br/>
            <b>Full name:</b>{createField("Full Name", 'fullName', Inputarea)}
            <b>About me: </b>{createField("About Me", 'aboutMe', Inputarea)}
            <b>Looking for a job: </b>{createField(null, 'lookingForAJob', Inputarea, [], {type: 'checkbox'})}
            <b>Professional
                skills: </b>{createField("My professional skills", 'lookingForAJobDescription', Textarea, [])}
            {Object.keys(contacts).map(key => {
                //if we get an object, we can iterate like that
                return <div key={key} className={s.contact}>
                    <b>{key} :</b>{createField(key, "contacts." + key, Inputarea)}</div>
            })}
        </form>
    )
}

let ProfileDataFormRedux = reduxForm({form: 'profile-form'})(ProfileDataForm)

export default ProfileDataFormRedux

