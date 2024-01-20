"use strict"

const db = require('../db');
const { NotFoundError, UnauthorizedError } = require('../expressError');
// Error handlers
// sql for partial update method

// ----- After completion
class User {

    /**
     * Create a new user with the given data
     * 
     * {id, first_name, last_name, password, isAdmin} => 
     *      {id, first_name, last_name, isAdmin}
     * 
     * Throws NotFoundError if id not found
     */
    static async create({id, first_name, last_name, password, isAdmin}){
        const duplicateCheck = await db.query(
            `SELECT id
            FROM users
            WHERE id = $1`,
            [id]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate user ID: ${id}`);
        }
        
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        
        const res = db.query(`
        INSERT INTO users 
            (id,
            first_name,
            last_name,
            password,
            is_admin)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, is_admin`,
        [id, first_name, last_name, hashedPassword, isAdmin]);

        const user = res.rows[0];

        return user;
    }

    /**
     * Get a given user
     * 
     * {id} => {id, first_name, last_name, isAdmin}
     * 
     * Throws NotFoundError if user id not found
     */

    static async get(id){
        const res = await db.query(`
        SELECT id, first_name, last_name, isAdmin
        FROM users
        WHERE id = $1`,
        [id]);

        const user = res.rows[0];

        if (!user) throw new NotFoundError(`No user found with ID ${id}`);

        return user;
    }

    static async getAll(){
        const res = await db.query(`
        SELECT id, first_name, last_name, isAdmin
        FROM users`);

        const users = res.rows;
        
        return users;
    }

    /**
     * Delete a given user
     * 
     * {id} => {deleted: id}
     * 
     * Throws NotFoundError if id not found
     */
    static async remove(id){
        const res = await db.query(`
        DELETE FROM users
        WHERE id = $1
        RETURNING id`,
        [id]);

        const user = res.rows[0];

        if (!user) throw new NotFoundError(`No user found with ID ${id}`);

        return {deleted: user};
    }

    /**
     * Update user data
     * 
     * {data} => {updated: id, first_name, last_name}
     * 
     * Data can include {firstName, lastName, password, isAdmin}
     * 
     * Throws NotFoundError if id not found
     */
    // TODO - Check all instances of first_name etc for naming conventions
    static async update(id, data) {
        if (data.password) {
          data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
    
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
              firstName: "first_name",
              lastName: "last_name",
              isAdmin: "is_admin",
            });
        const userIdVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE users 
                          SET ${setCols} 
                          WHERE id = ${userIdVarIdx} 
                          RETURNING id,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    is_admin AS "isAdmin"`;
        const result = await db.query(querySql, [...values, id]);
        const user = result.rows[0];
    
        if (!user) throw new NotFoundError(`No user: ${id}`);
    
        delete user.password;
        return user;
      }

    /**
     * Authenticate username and Password
     * 
     * {user_id, password} => {id, first_name, last_name, is_admin}
     */
    static async authenticate(id, password){
        const result = await db.query(`
        SELECT  id, 
                password, 
                first_name AS "firstName",
                last_name AS "lastName",
                is_admin AS "isAdmin"
        FROM users
        WHERE id = $1`,
        [id]);

        const user = res.rows[0];

        if(user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid id/password");
    }
}

module.exports = User