const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
/**
 * jobs table
 * id - serial, primary key
 * title - text, nn
 * salary - int
 * equity - numeric
 * company_handle - varchar, nn, fk
 */

//class
class Job {

    /**
     * Create a job, update db, return new job
     * 
     * Data should be {title, salary, equity, company_handle}
     */
    // create
    static async create({title, salary, equity, company_handle}){
        const result = await db.query(`
            INSERT INTO jobs (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle`,
            [title, salary, equity, company_handle]);
        
        const job = result.rows[0];
        return(job);
    }
    // findAll
    static async findAll(){
        const jobsRes = await db.query(`
        SELECT id, title, salary, equity, company_handle
        FROM jobs
        ORDER BY title
        `);
        return jobsRes.rows;
    }
    // get
    static async get(id) {
        const jobResult = await db.query(
            `SELECT id, title, salary, equity, company_handle
            FROM jobs
            WHERE id = $1`,
            [id]
        )

        const job = jobResult.rows[0]
        if(!job) throw new NotFoundError(`No job id:${id}`)
        return(job)
    }
    // TODO - Implement following methods
    // update
    // remove
}
module.exports = Job;