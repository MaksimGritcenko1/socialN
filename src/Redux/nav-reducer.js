const initialState = {
    navItem: [
        {id: 1, val: 'Profile', address: 'profile'},
        {id: 2, val: 'Messages', address: 'dialogs'},
        {id: 3, val: 'Users', address: 'users'},
        {id: 4, val: 'News', address: 'news'},
        // {id: 5, val: 'Music', address: 'music'},
        // {id: 6, val: 'Settings', address: 'settings'},
        // {id: 7, val: 'TodoList', address: 'to-do'}


    ],
    friends: [
        {
            id: 1,
            name: 'Pasha',
            picture: 'https://whatsism.com/uploads/posts/2018-07/1530544023_n6fgwzftnvg.jpg'
        },
        {
            id: 2,
            name: 'Veronika',
            picture: 'https://i.pinimg.com/originals/39/df/f1/39dff1a149ce821c91c31a9a7ff29914.jpg'
        },
        {id: 3, name: 'Maxim', picture: 'https://pbs.twimg.com/media/D8r-PBWWsAEXTfK.jpg'}
    ]

}

const navReducer = (state = initialState, action) => {
    return state
}


export default navReducer