import "./CheckOutStudent.css"
import React, { useEffect, useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Row, FormGroup,  } from 'reactstrap'
import {DatePicker} from "reactstrap-date-picker"
import LibraryApi from "../api";
import AlertContext from "../AlertContext";


const CheckOutStudent = ({modal, toggle, student , setUpdate}) => {

    const [books, setBooks] = useState([])
    const [selected, setSelected] = useState([])
    const {addAlert} = useContext(AlertContext)
    const [title, setTitle] = useState("")


    useEffect(() => {
        async function getBooks() {
            const newBooks = await LibraryApi.getUnread(student.id);
            const available = newBooks.filter((book) => book.available)
            setBooks(available);
        }
        getBooks()
    }, [])

    const INITIAL_STATE = {
        'student_id': student.id.toString(),
        'date': new Date().toISOString().slice(0, 10),
        'book_id': ""
    }

    const[formData, setFormData] = useState(INITIAL_STATE)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        try{
            LibraryApi.checkOut(formData)
            addAlert(`Book ${title} checked out to ${student.first_name} ${student.last_name} `, "success")
            setFormData(INITIAL_STATE)
            setUpdate(true);
            toggle()
        } catch(e){
            console.log(e)
        }
    }

    const handleDateChange = (v, f) => {
        setFormData(fData => ({
            ...fData,
            'date': f
        }));
        console.log(formData)
    }

    const handleBookChange = (id, title) => {
        setSelected(id)
        console.log(title)
        setTitle(title)
        setFormData(fData => ({
            ...fData,
            'book_id': id
        }))
        console.log(formData)
    }

    return(
        <Modal isOpen={modal} toggle={toggle} backdrop={true} size="lg">
            <ModalHeader toggle={toggle}>
                Check-Out
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                        <FormGroup id="checkoutForm">
                            <DatePicker name="date" 
                                        id="datePicker"
                                        defaultValue={formData.date}
                                        dateFormat="YYYY-MM-DD"
                                        placeholder="YYYY-MM-DD"
                                        onChange={handleDateChange}
                                        disabled={!formData.student_id}
                                        />
                        </FormGroup>
                        </Col>
                        <Row>
                            {books.map((book) => {
                                return(
                                        <Col    
                                            className={`d-flex bookCard col-6 col-sm-6 col-md-4 col-lg-3 rounded ${selected==book.id && "isSelected"}`}
                                            inverse={(selected == book.id)}
                                            onClick={() => {handleBookChange(book.id.toString(), book.title)}}>
                                    
                                        <Col xs="6"
                                            className="bg-light border d-flex flex-row bookImage rounded-left">
                                            <img    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                                                className="object-fit-scale mx-auto rounded"
                                                alt={`${book.title}`}
                                                />
                                        </Col>
                                        <Col xs="6"
                                            className="bg-light border d-flex flex-row bookTitle rounded-right">
                                            <h4>{book.title}</h4>
                                        </Col>
                                        </Col>
                                )
                            })}
                        </Row>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="submit" disabled={!(formData.book_id && formData.date)} id="submit" onClick={handleSubmit}>Check Out</Button>
                <Button className="cancelBtn" id="cancelBtn" color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CheckOutStudent
