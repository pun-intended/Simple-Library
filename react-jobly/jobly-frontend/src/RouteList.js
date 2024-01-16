import './App.css';
import "jwt-decode"
// import RouteList from './RouteList';
import JobList from './jobs/JobList';
import CompanyList from './companies/CompanyList';
import LoginForm from './user/LoginForm';
import SignupForm from './user/SignupForm';
import UserProfile from './user/UserProfile';
import Landing from './Landing';
import LogOut from './user/LogOut';
import React, { useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function RouteList({login, signup, patchUser, setToken, setCurrentUser}) {

  // const navigate = useNavigate()
  const currentUser = useContext(UserContext)
  
  function logout() {
    setToken("")
    setCurrentUser("")
  }

    return (
        <Routes>
              <Route exact path="/companies/:handle" element={<JobList />} />
              <Route exact path="/companies" element={<CompanyList />} />
              <Route exact path="/jobs" element={<JobList />} />
              <Route exact path="/login" element={<LoginForm login={login} />} />
              <Route exact path="/signup" element={<SignupForm signup={signup} />} />
              <Route exact path="/profile" element={<UserProfile user={currentUser} patchUser={patchUser}/>} />
              <Route exact path="/logout" element={<LogOut logout={logout} />} />
              <Route exact path="/" element={<Landing />} />
        </Routes>
    );
}

export default RouteList