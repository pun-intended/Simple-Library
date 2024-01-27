// Name, class, Book cover if they have checked out
// book - onClick ->BookDetails
import React from "react"

const StudentCard = ({student}) => {
    async function click(){
        console.log("click")
    }
    return(
        <div className="StudentCard">
            <h3 className="StudentCard Name">{student.first_name}</h3>
            <h3 className="StudentCard Name">{student.last_name}</h3>
            <img className="StudentCard cover" 
                src={`${`https://covers.openlibrary.org/b/isbn/${student.borrowing.isbn}-m.jpg`}`} 
                alt={`${student.borrowing.title}`}
                onClick={click}/>
        </div>
    )
}

export default StudentCard;