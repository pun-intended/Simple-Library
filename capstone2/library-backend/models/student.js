"use strict"

const db = require('../db')
// Error handlers
// sql for partial update method

class Student {

    /**
     * Create new student record
     * 
     * {first_name, last_name, level} = {created: {id, first_name, last_name, level}}
     */
    static async create({first_name, last_name, level}){
        const res = db.query(
            `INSERT INTO student (first_name, last_name, level)
            VALUES $1, $2, $3`,
            [first_name, last_name, level]
        )
        return {created: res.rows[0]}
    }
    
    /**
     * Return details on Student
     * 
     * {id} => {id, first_name, last_name, level}
     * 
     * throws NotFoundError if student ID doesn't exist
     */
    static async getStudent(studentId){
        const res = db.query(
            `SELECT id, first_name, last_name, level
            FROM students
            WHERE id = $1`,
            [studentId]
        );
        
        const student = res.rows[0];

        if (!student) throw new 
            NotFoundError(`No student found with id ${studentId}`);
        
        return student;
    }

    /**
     * Return an array with book IDs for books student has read.
     * 
     * {id} => [{id, isbn, title, stage, condition}, ...] 
     * @param {} studentId 
     */
    static async getReadBooks(studentId){
        // Join on book Id
        const booksRead = db.query(
            `SELECT books.id, books.isbn, books.title, books.stage, books.condition
            FROM books
            JOIN borrow_record ON borrow_record.book_id = books.id
            WHERE borrow_record.student_id = $1`,
            [studentId]
        )

        if(!booksRead.rows[0]) throw new NotFoundError(`No books found for student ID ${studentId}`)

        return booksRead;
    }


    //TODO - STRETCH
    /**
     * Set students class
     */
    static async setClass(studentId, classId){}
    
}