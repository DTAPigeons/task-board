import React, { useState, useEffect } from 'react';
import './UserEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByIdFromAPI, saveUserToAPI } from '../../../core/redux/actions/user-actions';
import { Redirect } from 'react-router-dom';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';

export function UserEdit(props) {
    console.log(props);
    const [editedUser, setEditedUser] = useState({name: '', email: '', password: '', isAdmin: false, isActive: false });
    const [error, setError] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldSelectUser, setShouldSelectUser] = useState(false);
    const [userChecked, setUserChecked] = useState(true);

    const dispatch = useDispatch();
    const existingUser = useSelector(state => state.usersReducer.selectedUser);
    const loggedUser  = useSelector(state => state.authReducer.loggedUser);


    

    useEffect(() => {
        dispatch(fetchLoggedUser());
        if (props.computedMatch.params.id) { 
            setUserChecked(false);         
            dispatch(fetchUserByIdFromAPI(props.computedMatch.params.id)).then(()=>{
            setShouldSelectUser(true);
            }).catch((err)=>{setError(err.message)});
        }        
    }, [props.computedMatch.params.id, dispatch]);

    const onInputChange = (event) => {
        event.persist();
        
        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        if (error) {
            setError('');
        }
    }

    const onCheckBoxChange = (event) => {
        event.persist();
        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked
        }))

        if (error) {
            setError('');
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(saveUserToAPI(editedUser)).then(() => {
            console.log('SUCCESS');
            setShouldRedirect(true);
        })
        .catch((err) => setError(err.message));
    }

    const selectUser = () => {
        setEditedUser(existingUser);
        setShouldSelectUser(false);
    }

    const checkUser = () =>{
        if(props.computedMatch.params.id != loggedUser.id && !loggedUser.isAdmin){
            setShouldRedirect(true);
        }
        setUserChecked(true);
    }

    return (
        <>
        { !userChecked && checkUser()}
        { shouldRedirect && <Redirect to='/users' /> }
        { shouldSelectUser && selectUser()}
        <div className="user-edit-wrapper">            
            <form className="user-edit-form" onSubmit={onFormSubmit}>
            { error && <span className="text-danger">{error}</span> }
                <div className="form-group">
                    <label labelfor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editedUser.name} />
                </div>
                <div className="form-group">
                    <label labelfor="email">Email: </label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} value={editedUser.email} />
                </div>
                <div className="form-group">
                    <label labelfor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange}  value={editedUser.password} />
                </div>
                <div className="form-group">
                    <label labelfor="isActive">Is Active: </label>
                    <input type="checkbox" name="isActive" id="isActive" className="form-control" onChange={onCheckBoxChange} checked={editedUser.isActive} />
                </div>
                <div className="form-group">
                    <label labelfor="isAdmin">Is Admin: </label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={onCheckBoxChange} checked={editedUser.isAdmin} />
                </div>
                <button className="btn btn-success">Save user</button>
            </form>
        </div>
        </>
    )
}