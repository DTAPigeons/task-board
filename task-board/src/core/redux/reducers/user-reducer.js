import { GET_ALL_USERS, DELETE_USER, SAVE_USER, GET_USER_BY_ID } from '../actions/action-types';

const initialState = {
    users: [],
    selectedUser: {name: '', email: '', password: '', isAdmin: false, isActive: false}
}

export function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS: 
            return { ...state, users: action.payload };
        case DELETE_USER: 
            return { ...state, users: state.users.filter(u => u.id !== action.payload )};
        case SAVE_USER:
            return {...state, users: state.users.push(action.payload)};
        case GET_USER_BY_ID:
            return {...state, selectedUser: {...action.payload, password: ''}};
        default: 
            return state;
    }
}
