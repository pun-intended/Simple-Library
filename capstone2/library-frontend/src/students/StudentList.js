// Show all students in class -> Student Card
// Dropdown menu for class
import React from "react"
import StudentCard from "./StudentCard";

const StudentList = () => {
    return(
        <div className="StudentList">
            {/* For each student in list */}
            <StudentCard student={student} />
        </div>
    )
}

export default StudentList;