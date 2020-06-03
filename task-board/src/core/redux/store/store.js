import { createStore, applyMiddleware } from 'redux';
import { usersReducer } from '../reducers/user-reducer';
import thunk from 'redux-thunk';

export const store = createStore(usersReducer, applyMiddleware(thunk));