import './App.css';
import LibraryApi from './api';
import React, { useEffect } from 'react';
import NavBar from "./NavBar"
import RouteList from "./RouteList"
import UserContext from "./UserContext.js"
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from './useLocalStorage';
import { jwtDecode } from 'jwt-decode';



function App() {

  const [token, setToken] = useLocalStorage('token', '')
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '')

      
  async function login(data) {
    const newToken = await LibraryApi.login(data);
    setToken(newToken)
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

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <NavBar />
          {/* <RouteList login={login} signup={signup} patchUser={patchUser} setToken={setToken} setCurrentUser={setCurrentUser}/> */}
          <RouteList />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

// TODO - Set max height of images, cards
// TODO - create cards for students
// TODO - Complete check-out modal
// TODO - Create check-in modal
// TODO - create book detail modal?
// TODO - Set default image for image not found
// TODO - Add alert notification to next page "____ checked in" / "_____ checked out to _____"