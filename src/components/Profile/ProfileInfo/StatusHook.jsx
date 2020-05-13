import React, {useEffect, useState} from "react";
import styles from "./StatusHook.module.css"

const StatusWithHooks = ({globalError, deleteError, ...props}) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>Status: {props.status}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            }
            {globalError ? <div>
                <p className={styles.globalError}>Some error happened: {globalError}</p>
                <button onClick={() => {
                    deleteError()
                    setStatus('')
                }}>OK
                </button>
            </div> : null}

        </>
    )
}

export default StatusWithHooks