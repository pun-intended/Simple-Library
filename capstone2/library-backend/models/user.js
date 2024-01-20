"use strict"

const db = require('../db')
// Error handlers
// sql for partial update method

// ----- After completion
class User {

    /**
     * Create a new user with the given data
     * 
     * {data} => {token}
     * 
     * Throws NotFoundError if id not found
     */
    static async create(data){}

    /**
     * Delete a given user
     * 
     * {id} => {deleted: id}
     * 
     * Throws NotFoundError if id not found
     */
    static async remove(id){}

    /**
     * Update user data
     * 
     * {data} => {updated: id, first_name, last_name}
     * 
     * Throws NotFoundError if id not found
     */
    static async update(data){}

    /**
     * Authenticate username and Password
     * 
     * {user_id, password} => {user_id, first_name, last_name, is_admin}
     */
    static async authenticate(user_id, password){}
}