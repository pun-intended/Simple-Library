import React from "react";
import { render } from "@testing-library/react";
import BookCard from "./BookCard";


const bookIn = {
    id: "101",
    title: "test book - in",
    isbn: "0-330-25864-8",
    stage: 2,
    condition: "great",
    available: true,
};

const bookOut = {
    id: "102",
    title: "test book - out",
    isbn: "	0-307-26543-9",
    stage: 2,
    condition: "good",
    available: false,
};

const setUpdate = jest.fn();
const toggleIn = jest.fn();
const toggleOut = jest.fn();

// Smoke test
it("renders without crashing", () => {
    render(<BookCard book={bookIn} setUpdate={setUpdate} />)
});

// Snapshot
const {asFragment} = render(<BookCard book={bookIn} setUpdate={setUpdate} />);
expect(asFragment()).toMatchSnapshot();

// Renders book correctly

// Correct button rendered for available book

// Correct button rendered for unavailable book

// button links to correct modal?