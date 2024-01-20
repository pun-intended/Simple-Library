import React from "react";
import App from "./App";
import LoginForm from "./users/LoginForm"
import CheckInList from "./books/CheckInList"
import StudentList from "./students/StudentList"
import BookList from "./books/BookList"

const RouteList = () => {

    return(
        <Routes>
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/checkin" element={<CheckInList />} />
            <Route exact path="/students" element={<StudentList />} />
            <Route exact path="/books" element={<BookList />} />
            <Route exact path="/" element={<Landing />} />
        </Routes>
    )

}

export default RouteList;