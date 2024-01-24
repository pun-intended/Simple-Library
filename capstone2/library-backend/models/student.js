"use strict"


const db = require('../db')
// Error handlers
// sql for partial update method
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
     * Returns {students: [{id, first_name, last_name, level}, ...]}
     */
    static async getAllStudents(){

        // TODO - Add class filter
        const students = await db.query(`
        SELECT  id,
                first_name,
                last_name,
                level
        FROM students
        `)
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
     * {id} => [{id, isbn, title, stage, condition}, ...]
     */
    static async getUnreadBooks(studentId){
        const unread = await db.query(
            `SELECT id, isbn, title, stage, condition
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