import React from "react";
import { render } from "@testing-library/react";
import StudentCard from "./StudentCard";


const setUpdate = jest.fn()
const toggleOut = jest.fn()
const toggleIn = jest.fn()
const studentHas = {
    fist_name: "test",
    last_name: "student",
    book_id: "101",
};
const studentHasNot = {
    fist_name: "test",
    last_name: "student",
};
// Smoke test
it("renders without crashing", () => {
    render(<StudentCard student={studentHas} setUpdate={setUpdate} />)
})

// Snapshot
const {asFragment} = render(<StudentCard student={studentHas} setUpdate={setUpdate} />)
expect(asFragment()).toMatchSnapshot()

// check_in button calls toggleIn method

// check_out button calls toggleOut method

// card contains student name

// card contains correct book icon