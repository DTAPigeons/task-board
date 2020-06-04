import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasksFromAPI } from '../../../core/redux/actions/task-actions';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';
import { TaskCard} from '../task-card/TaskCard';

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'
};

export function TaskList(props) {
    const dispatch = useDispatch();   

    const loggedUser = useSelector(state => state.authReducer.loggedUser);
    const tasks = useSelector(state=> state.taskReducer.tasks);


    useEffect(() => {
        dispatch(fetchAllTasksFromAPI());
        dispatch(fetchLoggedUser());
    }, [props.location.search, dispatch])

    const onDelete = (id) => {
        /*
        deleteNote(id).then(() => {
            setNotes((prevState) => {
                return prevState.filter(note => note.id !== id);
            })
        })
        */
    };
    
    return (
        <div className="notes-list-wrapper d-flex" style={listStyles}>
            { tasks.map(task => <TaskCard task={task} key={task.id} loggedUser = {loggedUser} onDeleteClick={onDelete} /> )}
        </div>
    );
}