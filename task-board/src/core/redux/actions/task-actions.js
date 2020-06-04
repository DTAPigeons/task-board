import { getAllTasks } from "../../api/tasks/tasks.api"
import { GET_ALL_TASKS } from "./action-types";

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
