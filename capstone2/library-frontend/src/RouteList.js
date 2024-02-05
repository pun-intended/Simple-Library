import React from "react";
import { Route, Routes } from "react-router-dom"
import LoginForm from "./users/LoginForm"
import LogOut from "./users/LogOut";
import StudentList from "./students/StudentList"
import BookList from "./books/BookList"
import Landing from './Landing';

function RouteList({login, logout}) {

    return(
        <Routes>
            <Route path="/login" element={<LoginForm login={login}/>} />
            <Route path="/logout" element={<LogOut logout={logout}/>} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/" element={<Landing />} />
        </Routes>
    )

}

export default RouteList;