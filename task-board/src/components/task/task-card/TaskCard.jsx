  
import React from 'react';
import { Link } from 'react-router-dom';
import { TaskStatus } from './../../../core/api/tasks/task-statuses';

const taskCardStyle = {
    maxWidth: '18rem'
};

const deleteBtnStyles = {
    cursor: 'pointer'
};

export function TaskCard({ task, onDeleteClick, loggedUser  }) {

    let taskClassByType = "card text-white m-3 ";
    switch(task.status) {
        case TaskStatus.Active: 
            taskClassByType += "bg-primary";
        break;
        case TaskStatus.Done: 
            taskClassByType += "bg-success";
        break;
        case TaskStatus.Pending:
            taskClassByType += "bg-secondary";
        break;
        default: 
            taskClassByType += "bg-primary";
        break;
    }

    return (
    <div className={taskClassByType} style={taskCardStyle}>
        <div className="card-header">
            {task.title}
            { (loggedUser.isAdmin || loggedUser.id === task.authorId) && <Link to={`/tasks/edit/${task.id}`} > Edit </Link> }
    { (loggedUser.isAdmin || loggedUser.id === task.authorId) && <span style={deleteBtnStyles} onClick={() => onDeleteClick(task.id)}>Delete</span> }
        </div>
        <div className="card-body">
            <p className="card-text">{task.content}</p>
        </div>
        <div className="card-footer bg-transparent border-secondary">
            <div>Author: {task.authorName}</div>
            <div>Created on: {task.date}</div>
        </div>
    </div>
    )
}