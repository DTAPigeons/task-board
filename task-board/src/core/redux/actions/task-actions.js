import { getAllTasks, getTasksByAuthorId, deleteTask, saveTask, getTaskById } from "../../api/tasks/tasks.api"
import { GET_ALL_TASKS, GET_TASKS_FOR_USER, DELETE_TASK, SAVE_TASK, GET_TASK_BY_ID } from "./action-types";

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


export function fetchTaskByIdFromAPI(id){
    return dispatch => {
        return getTaskById(id).then((task) => {
            dispatch({
                type: GET_TASK_BY_ID,
                payload: task
            })
        })
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


export function saveTaskToAPI(task){
    return dispatch => {
        return saveTask(task).then(() => {
                dispatch({
                    type: SAVE_TASK,
                    payload: task
                });
        });
    }
    
}