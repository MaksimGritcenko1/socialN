import React from 'react'
import s from './Dialogs.module.css'
import Message from "./Messages/Messages";
import Dialog from "./Dialog/Dialog";
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {
    let messages = props.messages.map(m => <Message message={m.message} key={m.id}/>)
    let dialogs = props.dialog.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)


    let addNewMessage = (values) => {
        props.sendMessage(values.dialogsBody)
    }

    return (
        <div className={s.dialogsWrapper}>
            <div className={s.dialogs}>
                {dialogs}
            </div>
            <div className={s.messages}>
                {messages}
                <DialogsFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}


const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' name='dialogsBody' placeholder='type your message here...'/>
            <button>Send message</button>
        </form>
    )
}

const DialogsFormRedux = reduxForm({form: 'AddDialogsForm'})(DialogsForm)


export default Dialogs