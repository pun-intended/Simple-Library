// Show all students in class -> Student Card
// Dropdown menu for class
import React from "react"
import StudentCard from "./StudentCard";
import { useState, useEffect, useContext } from "react";
import LibraryApi from "../api";
import {Container, Col, Table } from 'reactstrap'
import "./StudentCard.css";
import StudentContext from "../StudentContext";

const StudentList = () => {
    const [update, setUpdate] = useState(false)
    const {students, setStudents} = useContext(StudentContext)
    
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
                <h1> Students </h1>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr class="table-primary">
                            <th>Student</th>
                            <th></th>
                            <th>Book</th>
                            <th>Borrow Date</th>
                        </tr>
                    </thead>
                    <tbody>
            {students.map((st) =>  {
                return (
                    <StudentCard student={st} setUpdate={setUpdate} key={st.id}/>
                )})}
                    </tbody>
                </table>
            </Container>
            
        </div>
    )
}

export default StudentList;