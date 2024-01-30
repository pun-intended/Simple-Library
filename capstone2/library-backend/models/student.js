"use strict"

// TODO - rerun tests

const db = require('../db')
const { NotFoundError } = require('../expressError');

class Student {

    /**
     * Create new student record
     * 
     * {data} = {created: {id, first_name, last_name, level}}
     * 
     * Data should be {first_name, last_name, level}
     */
    static async create(data){
        const res = await db.query(
            `INSERT INTO students (id, first_name, last_name, level)
            VALUES (DEFAULT, $1, $2, $3)
            RETURNING id, first_name, last_name, level`,
                [data.first_name, 
                data.last_name, 
                data.level]
        )
        return res.rows[0]
    }
    
    /**
     * Get all students in class
     * 
     * Returns {students: [{id, first_name, last_name, level, book_id, title, isbn, borrow_date}, ...]}
     *  borrowing id
     */
    static async getAllStudents(){

        const students = await db.query(`
        SELECT  S.id,
                S.first_name,
                S.last_name,
                S.level, 
                q2.title,
                q2.isbn,
                q2.book_id,
                q2.borrow_date
        FROM students S
        LEFT OUTER JOIN 
            (SELECT B.id as book_id, 
                    B.title, 
                    B.isbn, 
                    rec.borrow_date, 
                    rec.student_id
            FROM books as B 
            JOIN borrow_record AS rec
            ON B.id = rec.book_id
            WHERE return_date IS NULL) AS q2 
        ON s.id = q2.student_id`)
        
        return students.rows;
    }

    /**
     * Return details on Student
     * 
     * {id} => {id, first_name, last_name, level}
     * 
     * throws NotFoundError if student ID doesn't exist
     */
    static async getStudent(studentId){

        const res = await db.query(
            `SELECT id, first_name, last_name, level
            FROM students
            WHERE id = $1`,
            [studentId]
        );

        if (!res.rows[0]) {
            throw new NotFoundError(`No student found with id ${studentId}`);
        }
        return res.rows[0];
    }

    /**
     * Return array of book that have not been read by a given student
     * 
     * {id} => [{id, isbn, title, stage, condition, available}, ...]
     */
    static async getUnreadBooks(studentId){
        const unread = await db.query(
            `SELECT id, 
                    isbn, 
                    title, 
                    stage, 
                    condition,
                    id NOT IN (SELECT b.id FROM books b JOIN borrow_record rec
                        ON rec.book_id = b.id
                        WHERE rec.return_date IS NULL) AS available
            FROM books
            WHERE id NOT IN
                (SELECT book_id
                    FROM borrow_record
                    WHERE student_id = $1)`,
            [studentId]
        )
        return unread.rows;
    }

    //TODO - STRETCH
    /**
     * Set students class
     */
    static async setClass(studentId, classId){}

        /**
     * Return an array with book IDs for books student has read.
     * 
     * {id} => [{id, isbn, title, stage, condition}, ...] 
     * @param {} studentId 
     */
    static async getReadBooks(studentId){
        const booksRead = await db.query(
            `SELECT books.id, books.isbn, books.title, books.stage, books.condition
            FROM books
            JOIN borrow_record ON borrow_record.book_id = books.id
            WHERE borrow_record.student_id = $1`,
            [studentId]
        )

        if(!booksRead.rows[0]) throw new NotFoundError(`No books found for student ID ${studentId}`)

        return booksRead;
    }
    
}

module.exports = Student;