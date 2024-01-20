// Simple card for list
// Cover (l, set height), title, who has, borrowed date
// OnClick function pass
import React from "react"

const BookCard = ({book, func}) => {
    return(
        <div className="BookCard">
            <img className="BookCard bookCover" src="" alt={`${book.title}`} />
            <p className="BookCard bookTitle">{`${book.title}`}</p>
            {!book.available && <p>{book.borrower}s</p>}
        </div>
    )
}

export default BookCard