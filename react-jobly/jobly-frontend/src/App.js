import './App.css';
import RouteList from './RouteList';
import React, {useEffect} from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from './NavBar';
import JoblyApi from './api';
import useLocalStorage from './useLocalStorage';
import UserContext from './UserContext';


function App() {


  const [token, setToken] = useLocalStorage('token', '')
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '')

      
  async function login(data) {
    const newToken = await JoblyApi.login(data);
    // localStorage.setItem('token', newToken)
    setToken(newToken)
  }
  async function signup(data) {
    const newToken = await JoblyApi.register(data)
    setToken(newToken)
  }
  async function patchUser(data){
    const newUser = JoblyApi.patchUser(data);
    setCurrentUser(newUser);
  }


  useEffect(() => {
    async function updateUser() {
    if(token.length > 0){
      
      try{
        const decodedToken = jwtDecode(token)
        const username = decodedToken.username
        console.log(`${username}`)
        const user = await JoblyApi.getUser(username)
        console.log("-----Setting currentuser")
        setCurrentUser(user)
      } catch (e) {
        console.log(`Token Error: ${e}`)
      }}}
    updateUser()
    
  },[token])

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
            {/*TODO - better abstraction, refactor */}
            <RouteList login={login} signup={signup} patchUser={patchUser} currentUser={currentUser}/>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}



export default App;
