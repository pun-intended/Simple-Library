import React from "react";
import { render } from "@testing-library/react";
import StudentList from "./StudentList";
import StudentContext from "../StudentContext";


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
    render(<StudentContext.Provider value={students}>
        <StudentList />
        </StudentContext.Provider>);
});

// Snapshot
it("Matches snapshot", () => {
    const {asFragment} = render(<StudentContext.Provider value={students}>
        <StudentList />
        </StudentContext.Provider>);
    expect(asFragment()).toMatchSnapshot();
})

// .getAllStudents called once

// List contains all students