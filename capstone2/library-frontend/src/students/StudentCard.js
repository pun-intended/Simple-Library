// Name, class, Book cover if they have checked out
// book - onClick ->BookDetails
import React from "react"
import {Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faHandHolding } from '@fortawesome/free-solid-svg-icons'


const StudentCard = ({student}) => {
    async function click(){
        console.log("click")
    }
    return(
        <Card className="StudentCard">
            <CardTitle >{student.first_name} {student.last_name}</CardTitle>

            {student.book_id &&
                <FontAwesomeIcon icon={faBook} size="lg" className="btn-outline-primary" onClick={click} />
            }

            {!student.book_id &&
                <FontAwesomeIcon icon={faHandHolding} onClick={click}/>}
        </Card>
    )
}

export default StudentCard;