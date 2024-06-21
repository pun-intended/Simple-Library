// List all books available -> book card
// List all books checked out -> book card
// Click available book to show checkout card

import React, { useEffect, useState, useContext } from "react"
import BookCard from "./BookCard";
import LibraryApi from "../api";
import {Container, Col, Row} from 'reactstrap'
import StudentContext from "../StudentContext";
import "./BookList.css"

// TODO - Move books/update out, pass books as param to make {outstanding} {all books} {available} list
const BookList = () => {
    const {setStudents} = useContext(StudentContext)
    const [books, setBooks] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect( () => {
        async function initializeList(){
            const updateBooks = await LibraryApi.getAllBooks()
            const updateStudents = await LibraryApi.getAllStudents()
            setBooks(updateBooks)
            setStudents(updateStudents)
            setUpdate(false)
        }
        initializeList()
    }, [update])

    return(
        <Container className="BookList">
            <h1>All Books</h1>
                <Row className="align-items-stretch"> 
                    {books.map((book) => {
                        return(
                            <BookCard book={book} setUpdate={setUpdate} key={book.id}/> 
                        )
                    })}
                </Row>     
        </Container>
    )
}

export default BookList;