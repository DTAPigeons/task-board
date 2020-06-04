import { createStore, applyMiddleware, combineReducers } from 'redux';
import { usersReducer } from '../reducers/user-reducer';
import { authReducer } from '../reducers/auth-reducer';
import { taskReducer } from '../reducers/task-reducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({usersReducer, authReducer, taskReducer});

export const store = createStore(reducer, applyMiddleware(thunk));