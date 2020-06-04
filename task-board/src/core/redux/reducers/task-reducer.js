import { GET_ALL_TASKS} from '../actions/action-types';


const initialState = {
    tasks: []
};

export function taskReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_TASKS: 
            return { ...state, tasks: action.payload };
        default: 
            return state;
    }
}
