// Show Cover, title, checked-out date, student who has it
// Check-in button ->CheckInCard?
// Check out button -> CheckOutCard
// Border in color of stage
import React from "react";

const BookDetails = ({book}) => {
    return(
        // card layout
        <div className={`BookDetails ${book.stage}`}>
            <img className="BookDetails cover" src="" alt={`${book.title}`} />
            <h3 className="BookDetails title">{`${book.title}`}</h3>
            <h2 className="BookDetails borrower">{book.borrower}</h2>
            <h2 className="BookDetails checkout">{book.checkoutDate}</h2>
            {/* Move to appropriate page on click? */}
            <button disabled={!book.available} onClick={func}>Check In</button>
            <button disabled={book.available} onClick={func}>Check Out</button>
        </div>
    )
}

export default BookDetails;