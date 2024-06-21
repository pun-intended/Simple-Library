// Simple card for list
// Cover (l, set height), title, who has, borrowed date
// OnClick function pass
import React, { useState } from "react"
import {Col, Row, Button } from 'reactstrap'
import CheckOutModal from "./CheckOutModal.js";
import CheckInModal from "./CheckInModal.js";

const BookCard = ({book, setUpdate}) => {

    const [outModal, setOutModal] = useState(false);
    const [inModal, setInModal] = useState(false);
    const toggleOut = () => { setOutModal(!outModal)};
    const toggleIn = () => { setInModal(!inModal)};

    return(
            <Col    
                className={`bookCard col-6 col-sm-6 col-md-4 col-lg-3`}>
                <Row className="d-flex ">
                    <Col xs="6"
                        className="bg-light border d-flex flex-row bookImage rounded-left">
                        <img    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                            className="object-fit-scale mx-auto rounded"
                            alt={`${book.title}`}
                        />
                    </Col>
                    <Col xs="6"
                        className="bg-light border d-flex flex-column bookTitle rounded-right justify-content-around">
                        <h4>{book.title}</h4>
                        {!book.available && <Button color="secondary" className="btn-primary" onClick={toggleIn}>Check-in</Button>}
                        {book.available && <Button color="primary" className="btn-primary" onClick={toggleOut}>Check-out</Button>}
                    </Col>
                
            </Row>
           {outModal && <CheckOutModal modal={outModal} toggle={toggleOut} book={book} setUpdate={setUpdate}/>}
           {inModal && <CheckInModal modal={inModal} toggle={toggleIn} book_id={book.id} setUpdate={setUpdate}/>}
            </Col>
            
    )
}

export default BookCard