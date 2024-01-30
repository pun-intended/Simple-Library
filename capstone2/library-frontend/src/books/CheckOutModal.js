import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Row } from 'reactstrap'
import "./CheckOutModal.css"

const CheckOutModal = ({modal, toggle, book}) => {

    return(
        <Modal isOpen={modal} toggle={toggle} backdrop="true">
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
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Check Out</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CheckOutModal

