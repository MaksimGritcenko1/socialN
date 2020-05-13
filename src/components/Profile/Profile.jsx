import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = ({globalError, deleteError, ...props}) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.content}>
            <div className={s.profileWrapper}>
                <div className={s.profileInfo}>
                    <ProfileInfo
                        globalError={globalError}
                        updateProfileData={props.updateProfileData}
                        savePhoto={props.savePhoto}
                        isOwner={props.isOwner}
                        updateStatus={props.updateStatus}
                        status={props.status}
                        profile={props.profile}
                        saveProfile={props.saveProfile}
                        deleteError={deleteError}
                    />
                </div>
                <MyPostsContainer />
            </div>

        </div>
    );
};

export default Profile;
