import React, { useContext, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Row, Input, FormGroup } from 'reactstrap'
import {DatePicker} from "reactstrap-date-picker"
import "./CheckOutModal.css"
import StudentContext from "../StudentContext";
import LibraryApi from "../api";


const CheckOutModal = ({modal, toggle, book , setUpdate}) => {

    const {students} = useContext(StudentContext)

    const INITIAL_STATE = {
        'student_id': "",
        'date': new Date().toISOString().slice(0, 10),
        'book_id': book.id.toString()
    }

    const[formData, setFormData] = useState(INITIAL_STATE)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        try{
            console.log(formData)
            LibraryApi.checkOut(formData)
            setFormData(INITIAL_STATE)
            setUpdate(true);
            toggle()
        } catch(e){
            console.log(e)
        }
    }

    const handleDateChange = (v, f) => {
        console.log(`v - ${v}`)
        console.log(`f - ${f}`)
        setFormData(fData => ({
            ...fData,
            'date': f
        }));
        console.log(formData)
    }

    const handleChange = evt => {
        const { name, value } = evt.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
        console.log(formData)
    }

    return(
        <Modal isOpen={modal} toggle={toggle} backdrop={true}>
            <ModalHeader toggle={toggle}>
                Check-Out - {`${book.title}`}
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                                alt={`${book.title}`}/>
                        </Col>
                        <Col>
                        <FormGroup id="checkoutForm">
                            <Input  type="select" 
                                    name="student_id" 
                                    id="selectStudent" 
                                    value={formData.student}
                                    onChange={handleChange}>
                            <option>--Select Student</option>
                                {students.map(st => {
                                    if(!st.book_id && !(st.has_read.includes(book.id))){
                                        return (
                                        <option value={parseInt(st.id)}>
                                            {st.first_name} {st.last_name}
                                        </option>
                                        )}
                                })}
                            </Input>
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
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Check Out</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CheckOutModal

