const MESSAGE_VALUE = 'dialogs/MESSAGE-VALUE'
const NEW_MESSAGE = 'dialogs/NEW-MESSAGE'


//fake behavior for this page
const initialState = {
    dialog: [
        {id: 1, name: 'Pasha'},
        {id: 2, name: 'Veronika'},
        {id: 3, name: 'Maxim'},
        {id: 4, name: 'Alexandra'},
        {id: 5, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hey'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'A nice weather!'},
        {id: 4, message: 'Do you wanna go for a walk?'},
        {id: 5, message: 'dog'}
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE: {
            let body = action.messageValue
            return {
                ...state,
                messages: [...state.messages,
                    {id: 6, message: body}]
            }
        }
        default:
            return state
    }
}


export const messageValueActionCreator = (text) => ({type: MESSAGE_VALUE, text: text})
export const newMessageActionCreator = (messageValue) => ({type: NEW_MESSAGE, messageValue})

export default dialogsReducer