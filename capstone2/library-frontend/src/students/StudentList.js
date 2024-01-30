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
    const [update, setUpdate] = useState(false)
    const {students, setStudents} = useContext(StudentContext) 
    // const [students, setStudents] = studentState
    
    useEffect( () => {
        async function initializeList(){
            const allStudents = await LibraryApi.getAllStudents()
            setStudents(allStudents)
            setUpdate(false)
        }
        initializeList()
    }, [update])

    return(
        <div className="StudentList">
            <Container>
                <h1> All Students </h1>
                <Row>
            {students.map((st) =>  {
                return (
                    <Col xs="6" sm="4" md="3" lg="2">
                    <StudentCard student={st} setUpdate={setUpdate} key={st.id}/>
                    </Col>
                )})}
                </Row>
            </Container>
            
        </div>
    )
}

export default StudentList;