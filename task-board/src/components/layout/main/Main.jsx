import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import { UsersList } from '../../user/user-list/UserList';
import { UserEdit } from '../../user/user-edit/UserEdit'

export function Main(props){
    return(
    <div className="Main">
    <Switch>
    <AuthenticatedRoute exact path="/users" component={UsersList} />
    <AuthenticatedRoute exact path="/users/edit/:id" admin={false} component={UserEdit} />   
    </Switch>
    </div> );
    
}

