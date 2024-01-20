import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavBar from "./NavBar"
import RouteList from "./RouteList"
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RouteList />
      </BrowserRouter>
    </div>
  );
}

export default App;
