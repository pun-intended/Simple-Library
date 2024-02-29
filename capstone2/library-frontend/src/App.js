import './App.css';
import LibraryApi from './api';
import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar"
import RouteList from "./RouteList"
import UserContext from "./UserContext.js"
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from './useLocalStorage';
import { jwtDecode } from 'jwt-decode';
import StudentContext from './StudentContext.js';



function App() {
// TODO - Add alert funtionality
  // Alert component, state inside, display contingent on alert in state
  // dismissing alert removes alert from state, set timeout
  const [token, setToken] = useLocalStorage('token', '')
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '')
  const [students, setStudents] = useState([])
  const [alerts, setAlerts] = useState([])

      
  async function login(data) {
    const newToken = await LibraryApi.login(data);
    console.log(newToken)
    setToken(newToken)
  }

  function logout() {
    setToken("")
    // Clear session?
    setCurrentUser("")
  }

  async function signup(data) {
    const newToken = await LibraryApi.register(data)
    setToken(newToken)
  }
  async function patchUser(data){
    const newUser = LibraryApi.patchUser(data);
    setCurrentUser(newUser);
  }

  useEffect(() => {
    async function updateUser() {
      if(token.length > 0){
        try{
          const decodedToken = jwtDecode(token)
          const id = decodedToken.id
          const user = await LibraryApi.getUser(id)
          setCurrentUser(user)
        } catch (e) {
          console.log(`Token Error: ${e}`)
        }}
    }
    updateUser()
  },[token])

  useEffect(() => {
    async function populateStudents() {
      if(token.length > 0){
        try{
          const Ss = await LibraryApi.getAllStudents()
          setStudents(Ss)
        }catch(e){
          console.log(`Error Loading Students: ${e}`)
        }
      }
    }
    populateStudents()
  },[token])

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <StudentContext.Provider value={{students, setStudents}}>
        <BrowserRouter>
          <NavBar />
          {/* <RouteList login={login} signup={signup} patchUser={patchUser} setToken={setToken} setCurrentUser={setCurrentUser}/> */}
          <RouteList login={login} logout={logout}/>
        </BrowserRouter>
        </StudentContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

// TODO - create alert hook (alerts, addAlert, setAlerts)
// TODO - timeout? close? close on refresh?
// TODO - put alerts in context
// TODO - add qr code functionality
// TODO - Set default image for image not found
// TODO - Add alert notification to next page "____ checked in" / "_____ checked out to _____"