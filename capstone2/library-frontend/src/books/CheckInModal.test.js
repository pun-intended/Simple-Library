import React from "react";
import { render } from "@testing-library/react";
import CheckInModal from "./CheckInModal";

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
const book_id = "101"
const setUpdate = jest.fn();

// LibraryApi.getBook = jest.fn(() => {return book})
// LibraryApi.checkIn = jest.fn()

// Smoke test
it("renders without crashing", () => {
    render(<CheckInModal modal={modal} toggle={toggle} book_id={book_id} setUpdate={setUpdate}/>)
})

// Snapshot
it("matches snapshot", () => {
    const {asFragment} = render(
        <CheckInModal   modal={modal} 
                        toggle={toggle} 
                        book_id={book_id} 
                        setUpdate={setUpdate}/>);
    expect(asFragment()).toMatchSnapshot();
});

// .getBook called on load

// Correct method call on button click (checkin, setUpdate, toggle)

// x calls toggle

// cancel calls toggle

// SetUpdate called on submission