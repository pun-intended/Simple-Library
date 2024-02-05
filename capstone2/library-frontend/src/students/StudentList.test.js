import React from "react";
import { render } from "@testing-library/react";
import StudentList from "./StudentList";


const students = {
    students: [{
        fist_name: "test",
        last_name: "student",
    },
    {
        fist_name: "test",
        last_name: "student",
        book_id: "101",
    }]
};

const setUpdate = jest.fn()
// LibraryApi.getAllStudents = jest.fn(() => {
//     return students;
// })

// Smoke test
it("renders without crashing", () => {
    render(<StudentList />)
})

// Snapshot

// .getAllStudents called once

// List contains all students