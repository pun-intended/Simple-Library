import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

function NavBar() {

  const currentUser = useContext(UserContext);
  
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Signup</NavLink>
          </NavItem>
        </Nav>
        {currentUser && <NavLink to="/profile" className="navbar-brand">
          {`${currentUser.username}`}
        </NavLink>}
        {currentUser && <NavLink exact to="/logout" className="navbar-brand">
          Logout
        </NavLink>}
      </Navbar>
    </div>
  );
}

export default NavBar;
