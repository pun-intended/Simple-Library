// Show all outstanding books - BookCard
// Click to open check-in -> BookDetails

//Could this be replaced by refactoring BookList?  Pass different function?
import React from "react";
import BookCard from "./BookCard";

const CheckInList = () => {
    return(
        <div className="BookList">
            <h1>Outstanding Books</h1>
            {/* for each book available */}
            <BookCard book={book} func={checkIn}/>
        </div>
    )
}

export default CheckInList;