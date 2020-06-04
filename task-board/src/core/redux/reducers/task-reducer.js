import { GET_ALL_TASKS, GET_TASKS_FOR_USER, DELETE_TASK, SAVE_TASK, GET_TASK_BY_ID} from '../actions/action-types';


const initialState = {
    tasks: [],
    selectedTask:{title: '', content: '', authorId: '', date: ''}
};

export function taskReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_TASKS: 
            return { ...state, tasks: action.payload };
            case GET_TASKS_FOR_USER: 
            return { ...state, tasks: action.payload };
            case DELETE_TASK: 
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload )};
            case SAVE_TASK:
                return {...state, tasks: state.tasks.concat([action.payload])};
            case GET_TASK_BY_ID:
                return {...state, selectedTask: {...action.payload}};
        default: 
            return state;
    }
}
