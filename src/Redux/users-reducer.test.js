import profileReducer, {addNewPost} from "./profile-reducer";
import UsersReducer, {followSuccess} from "./users-reducer";

const state = {
    users: [{id: 1, name: 'Maksim', followed: false}],
    pageSize: 100,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    ///////////////BUTTON DISABLED
    followingInProgress: []
}

test('user should be followed', () => {
    //action
    let action = followSuccess(1)
    //Data for test

    let newState = UsersReducer(state, action)
    //expectation
    expect(newState.users[0].followed).toBe(true)
});