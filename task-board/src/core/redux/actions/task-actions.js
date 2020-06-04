import { getAllTasks, getTasksByAuthorId, deleteTask } from "../../api/tasks/tasks.api"
import { GET_ALL_TASKS, GET_TASKS_FOR_USER, DELETE_TASK } from "./action-types";

export function fetchAllTasksFromAPI() {
    return dispatch => {
        return getAllTasks().then((tasks) => {
                dispatch({
                    type: GET_ALL_TASKS,
                    payload: tasks
                });
        });
    }
}

export function fetchAllTasksForUserFromAPI(userId) {
    return dispatch => {
        return getTasksByAuthorId(userId).then((tasks) => {
                dispatch({
                    type: GET_TASKS_FOR_USER,
                    payload: tasks
                });
        });
    }
}


export function deleteTaskFromAPI(id) {
    return dispatch => {
       return deleteTask(id).then(() => {
                 dispatch({
                   type: DELETE_TASK,
                   payload: id
                })
        });
    }
}