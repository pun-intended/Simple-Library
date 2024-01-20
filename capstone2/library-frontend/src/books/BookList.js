// List all books available -> book card
// List all books checked out -> book card
// Click available book to show checkout card

import React from "react"
import BookCard from "./BookCard";

const BookList = () => {

    return(
        <div className="BookList">
            <h1>Outstanding Books</h1>
            {/* for each book available */}
            <BookCard book={book} func={checkIn}/>
        </div>
    )
}

export default BookList;