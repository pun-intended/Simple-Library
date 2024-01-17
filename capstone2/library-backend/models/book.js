"use strict"

const db = require('../db')
// Error handlers
// sql for partial update method

class Book {

    /**
     * Check out book to student
     */
    static async checkOut(bookId, studentId){}

    /**
     * Check in book by ID
     */
    static async checkIn(bookId){}

    /**
     * Get a book given the ID
     */
    static async getBook(bookId){}

    /**
     * Get all books.
     */
    static async getAllBooks(){}

    /**
     * Get all books in a given stage
     */
    static async getBooksByStage(stage){}
    // ----- add after completion
    // static async newSet(){}
    // static async replace(){}

}