import { getAllUsers, deleteUser, saveUser, getUserByid } from "../../api/users/users.api"
import { GET_ALL_USERS, DELETE_USER, SAVE_USER, GET_USER_BY_ID } from "./action-types";

export function fetchAllUsersFromAPI() {
    return dispatch => {
        return getAllUsers().then((users) => {
                dispatch({
                    type: GET_ALL_USERS,
                    payload: users
                });
        });
    }
}

export function fetchUserByIdFromAPI(id){
    return dispatch => {
        return getUserByid(id).then((user) => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: user
            })
        })
    }

}

export function deleteUserFromAPI(id) {
    return dispatch => {
       return deleteUser(id).then(() => {
                 dispatch({
                   type: DELETE_USER,
                   payload: id
                })
        });
    }
}

export function saveUserToAPI(user){
    return dispatch => {
        return saveUser(user).then(() => {
                dispatch({
                    type: SAVE_USER,
                    payload: user
                });
        });
    }
    
}