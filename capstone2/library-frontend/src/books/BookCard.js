// Simple card for list
// Cover (l, set height), title, who has, borrowed date
// OnClick function pass
import React from "react"

const BookCard = ({book}) => {
    async function checkIn(){
        console.log("Check in")
    }
    async function checkOut(){
        console.log("Check out")
    }
    return(
        <div className="BookCard">
            <img className="BookCard bookCover" 
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                alt={`${book.title}`} />
            <p className="BookCard bookTitle">{`${book.title}`}</p>
            {book.borrow_date && <p>{book.student_id} - {book.last_name}, {book.first_name}</p>}
            {book.borrow_date && <button onClick={checkIn}> "Check-in"</button>}
            {!book.borrow_date && <button onClick={checkOut}> "Check-out"</button>}
        </div>
    )
}

export default BookCard