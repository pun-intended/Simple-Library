// List all books available -> book card
// List all books checked out -> book card
// Click available book to show checkout card

import React, { useEffect, useState, useContext } from "react"
import BookCard from "./BookCard";
import LibraryApi from "../api";
import {Container, Row, FormGroup, Input} from 'reactstrap'
import StudentContext from "../StudentContext";
import "./BookList.css"

// TODO - Move books/update out, pass books as param to make {outstanding} {all books} {available} list
const BookList = () => {
    const {setStudents} = useContext(StudentContext)
    const [books, setBooks] = useState([])
    const [update, setUpdate] = useState(false)
    const [stageData, setStage] = useState(null)
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

    const handleChange = (evt) => {
        let stage = evt.target.value;
        if(!stage){ stage = null }
        console.log(stage)
        setStage(stage)
    }

    return(
        <Container className="BookList">
            <h1>All Books</h1>
                <FormGroup
                    onChange={handleChange}>
                    <Input type="select">
                        <option value=""> Select Stage </option>
                        <option value="1"> Stage 1 </option>
                        <option value="2"> Stage 2 </option>
                        <option value="3"> Stage 3 </option>
                    </Input>
                </FormGroup>
                <Row className="align-items-stretch"> 
                    {books.map((book) => {
                        if(stageData === null){
                            return(
                                <BookCard book={book} setUpdate={setUpdate} key={book.id}/> 
                            )   
                        } else {
                            if(book.stage == stageData){
                                return(
                                    <BookCard book={book} setUpdate={setUpdate} key={book.id}/> 
                                )
                            }
                        }
                    
                    })}
                </Row>     
        </Container>
    )
}

export default BookList;