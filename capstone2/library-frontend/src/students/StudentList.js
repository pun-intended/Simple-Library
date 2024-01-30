// Show all students in class -> Student Card
// Dropdown menu for class
import React from "react"
import StudentCard from "./StudentCard";
import { useState, useEffect } from "react";
import LibraryApi from "../api";
import {Container, Col, Row, Button} from 'reactstrap'
import "./StudentCard.css";

const StudentList = () => {
    const [students, setStudents] = useState([])
    useEffect( () => {
        async function initializeList(){
            const students = await LibraryApi.getAllStudents()
            setStudents(students)
        }
        initializeList()
    }, [])

    return(
        <div className="StudentList">
            <Container>
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