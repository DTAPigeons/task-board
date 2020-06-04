import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskByIdFromAPI, saveTaskToAPI } from '../../../core/redux/actions/task-actions';
import { Redirect } from 'react-router-dom';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';

export function TaskEdit(props) {

    const [editedTask, setEditedTask] = useState({title: '', content: '', authorId: '', date: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldSelectTask, setShouldSelectTask] = useState(false);
    const [userChecked, setUserChecked] = useState(true);

    const dispatch = useDispatch();
    const existingTask= useSelector(state => state.taskReducer.selectedTask);
    const loggedUser  = useSelector(state => state.authReducer.loggedUser);

    console.log(props);
    useEffect(() => {
        dispatch(fetchLoggedUser());
        if (props.computedMatch.params.id) {
            setUserChecked(false);  
            dispatch(fetchTaskByIdFromAPI(props.computedMatch.params.id)).then(() => {
                setShouldSelectTask(true);
            });
        }
    }, [props.computedMatch.params.id, dispatch, setShouldSelectTask, setUserChecked])

    const onInputChange = (event) => {
        event.persist();
        setEditedTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        dispatch(saveTaskToAPI(editedTask)).then(() => {
            console.log('SUCCESS');
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    const selectTask= () => {
        setEditedTask(existingTask);
        setShouldSelectTask(false);
    }

    const checkUser = () =>{
        if(editedTask.authorId != loggedUser.id && !loggedUser.isAdmin){
            setShouldRedirect(true);
        }
        setUserChecked(true);
    }

    return (
        <>
        { !userChecked && checkUser()}
        { shouldRedirect && <Redirect to="/tasks" /> }
        { shouldSelectTask && selectTask()}
        <div className="note-edit-wrapper">
            <form onSubmit={onTaskSave}>
                <div className="form-group">
                    <label labelfor="title">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={editedTask.title} />
                </div>
                <div className="form-group">
                    <label labelfor="content">Content: </label>
                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={editedTask.content} />
                </div>
                <div className="form-group">
                    <label labelfor="status">Status: </label>
                    <select className="form-control" id="status" name="status" onChange={onInputChange} value={editedTask.status}>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button className="btn btn-primary">Save task</button>
            </form>
        </div>
        </>
    )
}