// Simple card for list
// Cover (l, set height), title, who has, borrowed date
// OnClick function pass
import React, { useState } from "react"
import {Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import CheckOutModal from "./CheckOutModal.js";

const BookCard = ({book}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => { setModal(!modal)};

    async function checkIn(){
        console.log("Check in")
    }
    async function checkOut(){
        console.log("Check out")
    }
    return(
        <Card >
            <CardBody>
            <CardTitle tag='h5'>
                {`${book.title}`}
            </CardTitle>
            </CardBody >
            <CardBody >
                <img className="BookCard BookCover" 
                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                    alt={`${book.title}`} />
            </CardBody>
            <CardBody >
                <CardText>
                    {!book.available && <Button className="btn-primary" onClick={checkIn}>Check-in</Button>}
                    {book.available && <Button className="btn-primary" onClick={toggle}>Check-out</Button>}
                </CardText>
            </CardBody>
            <CheckOutModal modal={modal} toggle={toggle} book={book}/>
        </Card>
    )
    //     <div className="BookCard">
    //         <img className="BookCard bookCover" 
    //             src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
    //             alt={`${book.title}`} />
    //         <p className="BookCard bookTitle">{`${book.title}`}</p>
    //         {book.borrow_date && <p>{book.student_id} - {book.last_name}, {book.first_name}</p>}
    //         {!book.available && <button onClick={checkIn}> "Check-in"</button>}
    //         {book.available && <button onClick={checkOut}> "Check-out"</button>}
    //     </div>
    // )
}

export default BookCard