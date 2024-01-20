"use strict"

const db = require('../db')
// Error handlers
// sql for partial update method

class Student {

    /**
     * Create new student record
     * 
     * {data} = {created: {id, first_name, last_name, level}}
     */
    static async create(data){}
    
    /**
     * Return details on Student
     * 
     * {id} => {id, first_name, last_name, level}
     * @param {*} studentId 
     */
    static async getStudent(studentId){}

    /**
     * Return an array with book IDs for books student has read.
     * 
     * {id} => [{id, isbn, title, stage, condition}, ...] 
     * @param {} studentId 
     */
    static async getReadBooks(studentId){}


    //TODO - STRETCH
    /**
     * Set students class
     */
    static async setClass(studentId, classId){}
    
}