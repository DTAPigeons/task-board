import React, { useState, useEffect } from 'react';
import { UserCard } from '../user-card/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersFromAPI, deleteUserFromAPI } from '../../../core/redux/actions/user-actions';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';

//const currentUser = getLoggedUser();
const usersListStyle = {
    flexWrap: 'wrap'
};

export function UsersList(props) {
    const dispatch = useDispatch();

    

    const currentUser = useSelector(state => state.authReducer.loggedUser);

    console.log(props);
    
    const users = useSelector(state => state.usersReducer.users);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        dispatch(fetchLoggedUser());
        dispatch(fetchAllUsersFromAPI());
    }, [props.location.search, dispatch]);

    const onUserDelete = (id) => {
        dispatch(deleteUserFromAPI(id));
    }

    return (
        <div className="users-list d-flex" style={usersListStyle}>
            {users.map((user) => <UserCard user={user} key={user.id} onDelete={onUserDelete} />)}
        </div>
    );
}