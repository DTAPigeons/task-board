import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { logOutUser } from '../../../core/redux/actions/auth-actions';

const logoutStyle = {
  cursor: 'pointer'
};

export function Header(props){
  const [isLoggedOut, setLogoutFlag] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const dispatch = useDispatch();

  const onLogout = (event) => {
    dispatch(logOutUser());
    setLogoutFlag(true);
  }

  const onSearchChange = (event) => {
    event.persist();
    setSearchParam(event.target.value);
  }

  const onSearchClick = (event) => {
    event.preventDefault();
    const pathNameUrl = props.location.pathname.substr(1);

    const historyObj = { pathname: `/${pathNameUrl}` };
    if (searchParam) {
      historyObj['search'] = `?q=${searchParam}`;
    }
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
        <NavDropdown.Item href="/users/create">Create user</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/tasks">All tasks</NavDropdown.Item>       
        <NavDropdown.Item href="/tasks/my-tasks">My Tasks</NavDropdown.Item>
        <NavDropdown.Item href="/tasks/create">Create Task</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline onSubmit={onSearchClick}>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onSearchChange} />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
  </Navbar>

    
      </>
      
      );
    
}