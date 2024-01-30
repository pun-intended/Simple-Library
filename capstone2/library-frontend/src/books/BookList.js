// List all books available -> book card
// List all books checked out -> book card
// Click available book to show checkout card

import React, { useEffect, useState } from "react"
import BookCard from "./BookCard";
import LibraryApi from "../api";
import getDateStr from "../helpers";
import {Container, Row, Col, CardGroup} from 'reactstrap'
import "./BookList.css"

const BookList = () => {
    const [books, setBooks] = useState([])
    useEffect( () => {
        async function initializeList(){
            const books = await LibraryApi.getAllBooks()
            setBooks(books)
        }
        initializeList()
    }, [])

    async function checkIn(book){
        const date = getDateStr()
        const checkIn = await LibraryApi.checkIn(book, date)
        return checkIn;
    }
    return(
        <Container className="BookList">
            <h1>All Books</h1>
                <CardGroup> 
                    {books.map((book) => {
                        return(
                        <Col className="BookCard" xs="2">
                            <BookCard book={book}/>
                        </Col>
                        )
                    })}
                </CardGroup>     
        </Container>
    )
}

export default BookList;