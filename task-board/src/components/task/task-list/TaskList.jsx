import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasksFromAPI, fetchAllTasksForUserFromAPI, deleteTaskFromAPI } from '../../../core/redux/actions/task-actions';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';
import { TaskCard} from '../task-card/TaskCard';

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'
};

export function TaskList(props) {
    const dispatch = useDispatch();   
    const [userChecked, setUserChecked] = useState(true);

    const loggedUser = useSelector(state => state.authReducer.loggedUser);
    const tasks = useSelector(state=> state.taskReducer.tasks);


    useEffect(() => {
        dispatch(fetchLoggedUser());
        if(props.myTask){
            setUserChecked(false);
        }
        else{
            dispatch(fetchAllTasksFromAPI());
        }
        
    }, [dispatch, setUserChecked])

    const onDelete = (id) => {
        dispatch(deleteTaskFromAPI(id))
    };
    
    const checkUser = () => {
        dispatch(fetchAllTasksForUserFromAPI(loggedUser.id));
        setUserChecked(true);
    }

    return (
        <>
        {!userChecked && checkUser()}
        <div className="notes-list-wrapper d-flex" style={listStyles}>
            { tasks.map(task => <TaskCard task={task} key={task.id} loggedUser = {loggedUser} onDeleteClick={onDelete} /> )}
        </div>
        </>
    );
}