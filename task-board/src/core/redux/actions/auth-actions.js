import { register } from "../../api/users/users.api"
import { SAVE_USER } from "./action-types";

export function registerUser(user){
    return dispatch => {
        register(user).then(() => {
            dispatch({
                type: SAVE_USER
            });
        });
    }
    
}