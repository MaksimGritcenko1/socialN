import s from "./ProfileInfo.module.css";
import styles from "./../../common/commonStyles/commonStyles.module.css";

import React, {useState} from "react";
import Yes from '../../../assets/images/yes.png'
import No from '../../../assets/images/no.png'
import StatusWithHooks from "./StatusHook";
import avatar from "./../../../assets/images/avatar.png"
import ProfileDataFormRedux from "./ProfileDataForm";
import cn from 'classnames'


const ProfileInfo = ({profile, isOwner, saveProfile, updateProfileData, globalError, deleteError, ...props}) => {

    let onAvatarPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    let [editMode, setEditMode] = useState(false)
    let [showInfo, setShowInfo] = useState(false)

    //instead of:
    // let onSubmit = (formData) => {
    //     saveProfile(formData)
    //     updateProfileData && setEditMode(false)
    // }

    let onSubmit = (formData) => {

        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }


    return (
        <div className={s.profileInfoWrapper}>
            <div className={s.avatarField}>
                <div>
                    <img
                        className={s.profileAvatar}
                        src={profile.photos.large || avatar}
                        alt=""
                    />
                </div>
                <div>
                    {isOwner && <input type={'file'} onChange={onAvatarPhotoSelected}/>}
                </div>
            </div>


            <div className={s.profileInfo}>
                <StatusWithHooks
                    globalError={globalError}
                    deleteError={deleteError}
                    aboutMe={profile.aboutMe}
                    updateStatus={props.updateStatus}
                    status={props.status}
                />
                {showInfo
                    ? editMode
                        // initial values - MAGIC of redux form. finds name in Field and
                        // if it finds appropriate property in object profile, returns to input value
                        ?
                        <ProfileDataFormRedux initialValues={profile} contacts={profile.contacts} onSubmit={onSubmit}/>
                        : <div>
                            <button className={cn(styles.button, s.button)} onClick={() => setShowInfo(false)}>Hide
                                Information
                            </button>
                            <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}
                                         saveProfile={saveProfile}/>
                        </div>


                    : <button className={cn(styles.button, s.button)} onClick={() => setShowInfo(true)}>Show
                        information</button>}


            </div>
        </div>
    )
}

let ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.aboutMeWrapper}>
            <div>
                {isOwner &&
                <button className={cn(styles.button, s.button)} onClick={() => goToEditMode()}>Edit</button>}
                <br/>
                <b>Full Name: {profile.fullName}</b>
                <br/>
                <b>About Me:</b><p>{profile.aboutMe}</p>
                <b>Looking for a job:</b> {profile.lookingForAJob
                ? <img className={s.jobImage} src={Yes} alt=""/>
                : <img className={s.jobImage} src={No} alt=""/>}
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b><p>{profile.lookingForAJobDescription}</p>
                </div>}

            </div>
            <div>
                <h4>Websites:</h4>
                {Object.keys(profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>

        </div>

    )
}


let Contacts = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle} :</b> {contactValue}
        </div>
    )
}

export default ProfileInfo