import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StudentCard from "./StudentCard";


const setUpdate = jest.fn()
const toggleOut = jest.fn()
// const toggleIn = jest.fn()
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


// check_in opens modal
it("opens modal when check_in clicked", () => {
    const {getByTitle} = render(<StudentCard student={studentHas} setUpdate={setUpdate} />);
    fireEvent.click(getByTitle('has-book'));
    // expect(toggleIn).toHaveBeenCalled();
    screen.debug();
})

// // check_out button calls toggleOut method
it("opens modal when check_in clicked", () => {
    const {getByTitle} = render(<StudentCard student={studentHasNot} setUpdate={setUpdate} />);
    fireEvent.click(getByTitle('no-book'));
    // expect(toggleIn).toHaveBeenCalled();
    screen.debug();
})

// // card contains student name
// it("Contains the student name", () => {

// })

// // card contains correct book icon
// it("Contains the hand icon if there is no book borrowed", () => {
    
// })

// it("Contains the book icon if there is a book borrowed", () => {

// })