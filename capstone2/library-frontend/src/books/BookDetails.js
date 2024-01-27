// Show Cover, title, checked-out date, student who has it
// Check-in button ->CheckInCard?
// Check out button -> CheckOutCard
// Border in color of stage
import React from "react";

const BookDetails = ({book}) => {
    function click(){
        console.log("click")
    }

    return(
        <div className={`BookDetails ${book.stage}`}>
            <img className="BookDetails cover" src="" alt={`${book.title}`} />
            <h3 className="BookDetails title">{`${book.title}`}</h3>
            {book.borrow_date && <h2 className="BookDetails borrower">{book.student_id} - {book.last_name}, {book.first_name}</h2>}
            {book.borrow_date && <h2 className="BookDetails checkout">{book.borrow_date}</h2>}
            {/* Move to appropriate page on click? */}
            <button disabled={!book.borrow_date} onClick={click}>Check In</button>
            <button disabled={book.borrow_date} onClick={click}>Check Out</button>
        </div>
    )
}

export default BookDetails;