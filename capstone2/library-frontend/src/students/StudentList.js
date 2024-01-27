// Show all students in class -> Student Card
// Dropdown menu for class
import React from "react"
import StudentCard from "./StudentCard";
import { useState, useEffect } from "react";
import LibraryApi from "../api";

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
            {students.map((st) =>  {
                return (
                    <StudentCard student={st} />
                )})}
            
        </div>
    )
}

export default StudentList;