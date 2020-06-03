import { LOG_IN_USER, LOG_OUT_USER, GET_LOGGED_USER } from '../actions/action-types';

const initialState = {
    loggedUser: {},
    isLoggedIn: false
}

export function authReducer(state = initialState, action) {
    switch(action.type) {
        case LOG_IN_USER:
            return {...state, loggedUser: action.payload, isLoggedIn: true};
        case LOG_OUT_USER:
            return {...state, loggedUser: {}, isLoggedIn: false};
        case GET_LOGGED_USER:
            return {...state, loggedUser: action.payload}
        default: 
            return state;
    }
}