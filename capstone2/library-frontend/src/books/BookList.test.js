import React from "react";
import { render } from "@testing-library/react";
import BookList from "./BookList";


const books = {
    books:[{
        id: "101",
        title: "test book",
        isbn: "999-999-9999",
        stage: 2,
        condition: "great",
        available: "good",
    },
    {
        id: "102",
        title: "test book",
        isbn: "999-999-9999",
        stage: 2,
        condition: "great",
        available: "good",
    },
    {
        id: "102",
        title: "test book",
        isbn: "999-999-9999",
        stage: 2,
        condition: "great",
        available: "good",
    }]
};

// LibraryApi.getAllStudents = jest.fn();
// LibraryApi.getAllBooks = jest.fn(() => books);
// Smoke test
it("renders without crashing", () => {
    render(<BookList />)
});

// Snapshot
it("matches snapshot", () => {
    const {asFragment} = render(<BookList />);
    expect(asFragment()).toMatchSnapshot();
});

// Renders books provided


// renders correct number of books