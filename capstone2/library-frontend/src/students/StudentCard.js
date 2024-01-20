// Name, class, Book cover if they have checked out
// book - onClick ->BookDetails
import React from "react"

const StudentCard = (student) => {
    return(
        <div className="StudentCard">
            <h3 className="StudentCard Name">{student.name}</h3>
            <h3 className="StudentCard Name">{student.name}</h3>
            <img className="StudentCard cover" 
                src={`${student.borrowing.cover}`} 
                alt={`${student.borrowing.title}`}
                onClick={func}/>
        </div>
    )
}

export default StudentCard;