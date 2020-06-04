import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOutUser } from '../../../core/redux/actions/auth-actions';
import { fetchLoggedUser } from '../../../core/redux/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';

const logoutStyle = {
  cursor: 'pointer'
};

export function Header(props){
  const [isLoggedOut, setLogoutFlag] = useState(false);

  const dispatch = useDispatch();

  const loggedUser = useSelector(state => state.authReducer.loggedUser);

  useEffect(() => {
    dispatch(fetchLoggedUser());
}, [dispatch]);

  const onLogout = (event) => {
    dispatch(logOutUser());
    setLogoutFlag(true);
  }

  

    return(
      <>
      { isLoggedOut && <Redirect to="/login" /> }

  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#">Task Board</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#" onClick={onLogout}>Logout</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="/users">Users</NavDropdown.Item>
        {loggedUser.isAdmin && <NavDropdown.Item href="/users/create">Create user</NavDropdown.Item>}
        <NavDropdown.Divider />
        <NavDropdown.Item href="/tasks">All tasks</NavDropdown.Item>       
        <NavDropdown.Item href="/tasks/my-tasks">My Tasks</NavDropdown.Item>
        <NavDropdown.Item href="/tasks/create">Create Task</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Navbar>

    
      </>
      
      );
    
}