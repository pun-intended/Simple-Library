// Show all outstanding books - BookCard
// Click to open check-in -> BookDetails

//Could this be replaced by refactoring BookList?  Pass different function?
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import LibraryApi from "../api";
// import getDateStr from "../helpers";

const CheckInList = () => {
    const [books, setBooks] = useState([])
    useEffect( () => {
        async function initializeList(){
            const books = await LibraryApi.getOutstandingBooks()
            setBooks(books)
        }
        initializeList()
    }, [])

    // async function checkIn(book){
    //     const date = getDateStr()
    //     const checkIn = await LibraryApi.checkIn(book, date)
    //     return checkIn;
    // }

    return(
        <div className="BookList">
            <h1>Outstanding Books</h1>
            {books.map((book) => {
                return(
                <BookCard book={book} />
                )
            })}
        </div>
    )
}

export default CheckInList;