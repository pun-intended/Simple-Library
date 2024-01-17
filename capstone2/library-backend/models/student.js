"use strict"

const db = require('../db')
// Error handlers
// sql for partial update method

class Student {

    /**
     * Create new student record
     */
    static async create(){}
    
    /**
     * Return details on Student
     * @param {*} studentId 
     */
    static async getStudent(studentId){}

    /**
     * Return an array with book IDs for books student has read.
     * @param {} studentId 
     */
    static async getReadBooks(studentId){}

    /**
     * Set students class
     */
    static async setClass(studentId, classId){}
    
}