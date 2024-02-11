// Name, class, Book cover if they have checked out
// book - onClick ->BookDetails
import React, {useState} from "react"
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faHandHolding } from '@fortawesome/free-solid-svg-icons'
import CheckOutStudent from "./CheckOutStudent"
import CheckInModal from "../books/CheckInModal"


const StudentCard = ({student, setUpdate}) => {
    
    const [outModal, setOutModal] = useState(false);
    const [inModal, setInModal] = useState(false);
    const toggleOut = () => { setOutModal(!outModal)};
    const toggleIn = () => { setInModal(!inModal)};
    
    return(
        <Card className="StudentCard">
            <Row>
            <Col >
            <CardTitle tag="h6">{student.first_name} {student.last_name}</CardTitle>
            </Col>
            <Col>
            {student.book_id && 
                <Button className="btn btn-primary" onClick={toggleIn}> Check in </Button>
            }

            {!student.book_id &&
                <Button className="btn btn-primary" onClick={toggleOut}> Check out </Button>}
            {outModal && <CheckOutStudent modal={outModal} toggle={toggleOut} student={student} setUpdate={setUpdate}/>}
            {inModal && <CheckInModal modal={inModal} toggle={toggleIn} book_id={student.book_id} setUpdate={setUpdate}/>}
            </Col>
            </Row>
        </Card>
        
    )
}

export default StudentCard;