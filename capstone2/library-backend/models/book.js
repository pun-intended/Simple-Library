"use strict"
const { NotFoundError } = require('../expressError.js')

const db = require('../db')
// Error handlers
// sql for partial update method

class Book {

    /**
     * Given a student ID and book ID, create a borrow record, and 
     * return the data.
     * 
     *  {data} => {borrowed: {id, book_id, student_id, borrow_date}}
     * Data should be {book_id, student_id, date}
     * 
     * Throws NotFoundError if student or book is not found
     */
    static async checkOut(data){
        const res = await db.query(
            `INSERT INTO borrow_record
            (book_id, student_id, borrow_date)
            VALUES ($1, $2, $3)
            RETURNING id, book_id, student_id, borrow_date`,
            [data.bookId, 
            data.studentId, 
            data.date]
        )
        const borrowRecord = res.rows[0]

        if (!borrowRecord) throw new NotFoundError("Error in book id or Student id")

        return {borrowed: borrowRecord}
    }

    /**
     * Given a book ID, check the book in
     * 
     * {data} => {Returned: {id, return_date}}
     * 
     * {data} should be {bookId, date}
     */
    static async checkIn(data){
        const res = await db.query(
            `UPDATE borrow_record
            SET return_date = $1
            WHERE book_id = $2 AND return_date = NULL
            RETURNING id, return_date
            `,
            [data.date, 
            data.bookId]
        )
        const checkIn = res.rows[0]

        if (!checkIn) throw new NotFoundError(`No outstanding record found for book id ${data.bookId}`)

        return {Returned: checkIn};
    }

    /**
     * Get all book data given the ID
     * 
     * {book_id} => {bookId, isbn, title, stage, condition, borrowing}
     *  where borrowing is {student_id, first_name, last_name, level, borrowDate}
     */
    static async getBook(bookId){
        const bookRes = await db.query(
            `SELECT B.id AS bookId,
                    B.isbn,
                    B.title,
                    B.stage,
                    B.condition
            FROM books B

            WHERE id = $1`,
            [bookId]);

        const book = bookRes.rows[0]

        if (!book) throw new NotFoundError(`No book with ID ${bookId}`)

        const borrowRes = await db.query(
            `SELECT S.id,
                    S.first_name AS firstName,
                    S.last_name AS lastName,
                    S.level,
                    rec.borrow_date AS borrowDate
            FROM borrow_record rec
            JOIN students S ON S.id = rec.student_id
            WHERE book_id = $1 AND return_date IS NULL`,
            [bookId]
        )

        const borrowing = borrowRes.rows[0]

        if(borrowing){
            book.student = borrowing;
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
     * Get all outstanding books
     * 
     * Returns [{bookId, isbn, title, stage, condition, studentId, firstName, lastName, borrowDate}, ...]
     */
    static async getOutstanding(){
        const books = await db.query(
            `SELECT B.id AS bookId,
                    B.isbn,
                    B.title,
                    B.stage,
                    B.condition,
                    S.id AS studentId
                    S.first_name AS firstName,
                    S.last_name AS lastName,
                    rec.borrow_date AS borrowDate
            FROM books B
            JOIN borrow_record rec ON B.id = rec.book_id
            JOIN students S on S.id = rec.student_id
            WHERE rec.return_date IS NULL`
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

module.exports = Book;