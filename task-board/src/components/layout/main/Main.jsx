import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import { UsersList } from '../../user/user-list/UserList';
import { UserEdit } from '../../user/user-edit/UserEdit';
import { TaskList } from '../../task/task-list/TaskList';

export function Main(props){
    return(
    <div className="Main">
    <Switch>
    <AuthenticatedRoute exact path="/users" component={UsersList} />
    <AuthenticatedRoute exact path="/users/edit/:id" admin={false} component={UserEdit} />
    <AuthenticatedRoute exact path="/users/create" admin={true} component={UserEdit} />  
    <AuthenticatedRoute exact path="/tasks" component={TaskList} />  
    <AuthenticatedRoute exact path="/tasks/my-tasks" component={TaskList} myTask={true} />  
    </Switch>
    </div> );
    
}

