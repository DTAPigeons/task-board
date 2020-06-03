import { getAllUsers, deleteUser, saveUser } from "../../api/users/users.api"
import { GET_ALL_USERS, DELETE_USER, SAVE_USER } from "./action-types";

export function fetchAllUsersFromAPI() {
    return dispatch => {
        getAllUsers().then((users) => {
            dispatch({
                type: GET_ALL_USERS,
                payload: users
            });
        });
    }
}

export function deleteUserFromAPI(id) {
    return dispatch => {
        deleteUser(id).then(() => {
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