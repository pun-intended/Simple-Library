// Show all students in class -> Student Card
// Dropdown menu for class
import React from "react"
import StudentCard from "./StudentCard";
import { useState, useEffect, useContext } from "react";
import LibraryApi from "../api";
import {Container, Col, Row, Button, Input} from 'reactstrap'
import "./StudentCard.css";
import StudentContext from "../StudentContext";

const StudentList = () => {
    const students = useContext(StudentContext)

    return(
        <div className="StudentList">
            <Container>
                <h1> All Students </h1>
                <Row>
            {students.map((st) =>  {
                return (
                    <Col sm="2">
                    <StudentCard student={st} />
                    </Col>
                )})}
                </Row>
            </Container>
            
        </div>
    )
}

export default StudentList;