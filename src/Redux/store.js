import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";


////SIMPLE STORE JUST FOR UNDERSTANDING WHAT`s INSIDE


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, post: 'Hello, how are you?', likes: '5'},
                {id: 2, post: 'Here is my new post!', likes: '10'},
                {id: 3, post: 'Here is my new post!', likes: '0'},
                {id: 4, post: 'Here is my new post!', likes: '20'}
            ],
            textValue: ''
        },
        dialogsPage: {
            dialog: [
                {id: 1, name: 'Pasha'},
                {id: 2, name: 'Veronika'},
                {id: 3, name: 'Maxim'},
                {id: 4, name: 'Alexandra'},
                {id: 5, name: 'Valera'}
            ],
            message: [
                {id: 1, message: 'Hey'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'Lol'},
                {id: 4, message: 'Blablabla'},
                {id: 5, message: 'Sobaka'}
            ],
            messageValue: ''
        },
        nav: {
            navItem: [
                {id: 1, val: 'Profile', address: 'profile'},
                {id: 2, val: 'Messages', address: 'dialogs'},
                {id: 3, val: 'News', address: 'news'},
                {id: 4, val: 'Music', address: 'music'},
                {id: 5, val: 'Settings', address: 'settings'},
            ],
            friends: [
                {
                    id: 1,
                    name: 'Pasha',
                    picture: 'https://whatsism.com/uploads/posts/2018-07/1530544023_n6fgwzftnvg.jpg'
                },
                {
                    id: 1,
                    name: 'Veronika',
                    picture: 'https://i.pinimg.com/originals/39/df/f1/39dff1a149ce821c91c31a9a7ff29914.jpg'
                },
                {id: 1, name: 'Maxim', picture: 'https://pbs.twimg.com/media/D8r-PBWWsAEXTfK.jpg'}
            ]

        },
        news: {
            newsMessages: [
                {id: 1, newsText: 'New great social network'},
                {id: 2, newsText: 'New great social website'},
                {id: 3, newsText: 'New great social public'},
                {id: 4, newsText: 'New great social game'}
            ],
            newText: ''


        }
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        profileReducer(this._state.profilePage, action)
        dialogsReducer(this._state.dialogsPage, action)
        newsReducer(this._state.news, action)

        this._callSubscriber(this._state)

    }
}


export default store
window.store = store