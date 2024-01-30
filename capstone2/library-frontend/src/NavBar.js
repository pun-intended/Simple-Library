import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

const NavBar = () =>{
    const currentUser = useContext(UserContext);
  
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Library
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/books">Books</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/students">Students</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Signup</NavLink>
          </NavItem>
        </Nav>
        {currentUser && <NavLink to="/profile" className="navbar-brand">
          {`${currentUser.id} - ${currentUser.first_name}`}
        </NavLink>}
        {currentUser && <NavLink exact to="/logout" className="navbar-brand">
          Logout
        </NavLink>}
      </Navbar>
    </div>
  );
}

export default NavBar;
