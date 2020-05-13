const ADD_NEWS = 'news/ADD_NEWS'


//fake behavior for this page

const initialState = {
    newsMessages: [
        {id: 1, newsText: 'New great social network'},
        {id: 2, newsText: 'New great social website'},
        {id: 3, newsText: 'New great social public'},
        {id: 4, newsText: 'New great social game'}
    ]
}
const newsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_NEWS:
            let text = action.newsMessageBody
            return {
                ...state,
                newsMessages: [...state.newsMessages, {id: 5, newsText: text}],
            }

        default:
            return state
    }


}

export const addNewsCreator = (newsMessageBody) => ({type: ADD_NEWS, newsMessageBody})


export default newsReducer