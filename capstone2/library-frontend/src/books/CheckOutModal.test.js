import React from "react";
import { render } from "@testing-library/react";
import CheckOutModal from "./CheckOutModal";
import StudentContext from "../StudentContext";

const modal = true;
const toggle = jest.fn();
const book = {
    id: "101",
    title: "test book",
    isbn: "	0-330-25864-8",
    stage: 2,
    condition: "great",
    available: true,
};
const setUpdate = jest.fn();

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

// Smoke test
it("renders without crashing", () => {
    render(
        <StudentContext.Provider value={students}>
        <CheckOutModal modal={modal} toggle={toggle} book={book} setUpdate={setUpdate}/>
        </StudentContext.Provider>);
})

// Snapshot
it("matches snapshot", () => {
    const {asFragment} = render(
        <StudentContext.Provider value={students}>
        <CheckOutModal  modal={modal} 
                        toggle={toggle} 
                        book={book} 
                        setUpdate={setUpdate}/>
        </StudentContext.Provider>);
    expect(asFragment()).toMatchSnapshot();
});

// list contains students from context

// list excludes students who have read

// Check-out calls setUpdate

// X Calls toggle

// cancel calls toggle