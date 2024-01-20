"use strict"

const db = require('../db')
// Error handlers
// sql for partial update method

class Book {

    /**
     * Given a student ID and book ID, create a borrow record, and 
     * return the data.
     * 
     *  {book_id, student_id} => {borrowed: borrowRecord}
     * 
     * Throws NotFoundError if student or book is not found
     */
    static async checkOut(bookId, studentId, date){
        const res = await db.query(
            `INSERT INTO borrow_record
            (book_id, student_id, borrow_date)
            VALUES ($1, $2, $3)
            RETURNING id, book_id, student_id, borrow_date`,
            [bookId, studentId, date]
        )
        const borrowRecord = res.rows[0]

        if (!borrowRecord) throw new NotFoundError("Error in book id or Student id")

        return {borrowed: borrowRecord}
    }

    /**
     * Given a book ID, check the book in
     * 
     * {book_id} => {Returned: bookId}
     */
    static async checkIn(bookId, date){
        const res = await db.query(
            `UPDATE borrow_record
            SET return_date = $1
            WHERE book_id = $2 AND return_date = NULL
            RETURNING id
            `,
            [date, bookId]
        )
        const checkIn = res.rows[0]

        if (!checkIn) throw new NotFoundError(`No outstanding record found for book id ${bookId}`)

        return {Returned: bookId};
    }

    /**
     * Get all book data given the ID
     * 
     * {book_id} => {book_id, isbn, title, stage, condition, borrowing}
     *  where borrowing is {student_id, first_name, last_name, level}
     */
    // ADVICE could this be done better with a join?
    static async getBook(bookId){
        const bookRes = await db.query(
            `SELECT id AS book_id,
                    isbn,
                    title,
                    stage,
                    condition
            FROM books
            WHERE id = $1`,
            [bookId]);

        const book = bookRes.rows[0]

        if (!book) throw new NotFoundError(`No book with ID ${bookId}`)

        const borrowRes = await db.query(
            `SELECT id,
                    book_id,
                    student_id,
                    borrow_date
                    
            FROM borrow_record
            WHERE book_id = $1 AND return_date = NULL`,
            [bookId]
        )

        const record = borrowRes.rows[0]

        if(record){
            const studentRes = await db.query(
                `SELECT id AS student_id,
                        first_name,
                        last_name,
                        level
                FROM students
                WHERE student_id = $1`,
                [record.student_id]
            )
            const student = studentRes.rows[0]

            book.student = student;
        }

        return book;


    }

    /**
     * Get all books in library.
     * 
     * Returns [{id, isbn, title, stage, condition}, ...] 
     */
    static async getAllBooks(){
        const books = await db.query(
            `SELECT id,
                    isbn,
                    title,
                    stage,
                    condition
            FROM books`
        )
        return books.rows
    }

    /**
     * Get all books in a given stage
     * {stage} => [{id, isbn, title, stage, condition}, ...]
     */
    static async getBooksByStage(stage){}
    // ----- add after completion
    // static async newSet(){}
    // static async replace(){}

}