import React from "react";
import { render } from "@testing-library/react";
import CheckOutModal from "./CheckOutModal";

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


// Smoke test
it("renders without crashing", () => {
    render(<CheckOutModal modal={modal} toggle={toggle} book={book} setUpdate={setUpdate}/>);
})

// Snapshot
it("matches snapshot", () => {
    const {asFragment} = render(
        <CheckOutModal  modal={modal} 
                        toggle={toggle} 
                        book={book} 
                        setUpdate={setUpdate}/>);
    expect(asFragment()).toMatchSnapshot();
});

// list contains students from context

// list excludes students who have read

// Check-out calls setUpdate

// X Calls toggle

// cancel calls toggle