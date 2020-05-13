import React from "react";
import Post from './Posts/Post'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";


const MyPosts = React.memo((props) => {

    let postsItem = [...props.posts].reverse().map(p => <Post toLike={props.like} id={p.id} message={p.post} key={p.id}
                                                              like={p.likes}/>)

    let addNewPost = (values) => {
        props.addNewPost(values.newPostBody)
    }

    return (
        <div>
            <label htmlFor="form">My posts</label>
            <div>
                <MyPostsFormRedux onSubmit={addNewPost}/>
            </div>
            <div>
                {postsItem}
            </div>
        </div>
    )
})


const maxLength15 = maxLengthCreator(15)
const MyPostsForm = (props) => {


    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name='newPostBody'
                validate={[required, maxLength15]}
                placeholder='type your new post here'


            />
            <button>Add post</button>
        </form>
    )
}

const MyPostsFormRedux = reduxForm({form: 'addPostsForm'})(MyPostsForm)


export default MyPosts;
