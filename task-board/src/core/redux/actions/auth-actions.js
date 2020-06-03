import { login, logout, getLoggedUser } from "../../api/users/users.api"
import { LOG_IN_USER, LOG_OUT_USER, GET_LOGGED_USER } from "./action-types";

export function logInUser(user){
    return dispatch => {
        login(user).then(() => {
            const userData = getLoggedUser();
            dispatch({
                type: LOG_IN_USER,
                payload: userData
            });
        });
    }    
}

export function logOutUser(){
    return dispatch=>{
        logout();
        dispatch({
            type: LOG_OUT_USER
        })
    }
}

export function fetchLoggedUser(){
    return dispatch=>{
        const user = getLoggedUser();
        dispatch({
            type: GET_LOGGED_USER,
            payload: user
        })
    }
}