import React from "react";
import profileReducer, {addNewPost, deletePost} from "./profile-reducer";

//common data for the both tests below
let state = {
    posts: [
        {id: 1, post: 'Hello, how are you?', likes: '5'},
        {id: 2, post: 'Here is my new post!', likes: '10'},
        {id: 3, post: 'Here is my new post!', likes: '0'},
        {id: 4, post: 'Here is my new post!', likes: '20'}
    ]
}
//test better to divide in lonely pieces
test('new post should be added', () => {
    //action
    let action = addNewPost('New post for test')
    //Data for test

    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(5)
});

test('new post should be added', () => {
    //action
    let action = addNewPost('New post for test')
    //Data for test

    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts[4].post).toBe('New post for test')
});

test('post should be deleted by id', () => {
    //action
    let action = deletePost(1)
    //Data for test

    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(3)
});

test('post shouldn`t be changed if id is incorrect', () => {
    //action
    let action = deletePost(1000)
    //Data for test

    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(4)
});

