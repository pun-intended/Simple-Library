import React from "react";
import { render } from "@testing-library/react";
import CheckOutStudent from "./CheckOutStudent";
import LibraryApi from "../api";


const books = {
    books: [{
        id: "101",
        title: "test book - in",
        isbn: "0-330-25864-8",
        stage: 2,
        condition: "great",
        available: true,
    },
    {
        id: "102",
        title: "test book - out",
        isbn: "	0-307-26543-9",
        stage: 2,
        condition: "good",
        available: false,
    }]
};

const student = {
    id: "1001",
    fist_name: "test",
    last_name: "student",
    has_read: ["101"],
};

const toggle = jest.fn();
const setUpdate = jest.fn();


// Smoke test
it("renders without crashing", () => {
    render(<CheckOutStudent modal={true} 
                            toggle={toggle} 
                            student={student} 
                            setUpdate={setUpdate} />)
});

// Snapshot
it("matches snapshot", () => {
    const asFragment = render(<CheckOutStudent  modal={true} 
                                                toggle={toggle} 
                                                student={student} 
                                                setUpdate={setUpdate} />)
});

// Book List includes all books

// Book list excludes read books

// list excludes students who have read

// Check-out calls setUpdate

// X Calls toggle

// cancel calls toggle

// Can mocking mock state variables?