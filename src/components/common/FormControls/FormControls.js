import React from "react"
import styles from './FormControls.module.css'
import {Field} from "redux-form";


export const Textarea = ({input, meta, ...props}) => {
    //input and meta are objects in object props.
    //in props placeholder, in input: value, field name, events
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControls + " " + (hasError && styles.error)}>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Inputarea = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={styles.formControls + " " + (hasError && styles.error)}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


////type: password might come in props

export const createField = (placeholder, name, component, validators, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validators}
               {...props}
        />{text}
    </div>
)



