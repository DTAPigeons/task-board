import { GET_ALL_TASKS, GET_TASKS_FOR_USER, DELETE_TASK} from '../actions/action-types';


const initialState = {
    tasks: []
};

export function taskReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_TASKS: 
            return { ...state, tasks: action.payload };
            case GET_TASKS_FOR_USER: 
            return { ...state, tasks: action.payload };
            case DELETE_TASK: 
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload )};
        default: 
            return state;
    }
}
