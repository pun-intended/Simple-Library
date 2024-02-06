import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
it("matches snapshot", () => {
    const {asFragment} = render(<StudentCard student={studentHas} setUpdate={setUpdate} />);
    expect(asFragment()).toMatchSnapshot();
})


// check_in button calls toggleIn method
it("calls toggleIn method when check_in clicked", () => {
    render(<StudentCard student={studentHas} setUpdate={setUpdate} />);
    screen.getByRole('')
    // fireEvent.click(getByRole("button"));
    // expect(toggleIn).toHaveBeenCalled();
})

// // check_out button calls toggleOut method
// it("calls toggleOut method when check_out clicked", () => {
    
// })

// // card contains student name
// it("Contains the student name", () => {

// })

// // card contains correct book icon
// it("Contains the hand icon if there is no book borrowed", () => {
    
// })

// it("Contains the book icon if there is a book borrowed", () => {

// })