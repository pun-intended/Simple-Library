
const Job = require("./job.js")
const db = require("../db")

const { BadRequestError, NotFoundError } = require("../expressError");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**
 * jobs table
 * id - serial, pprimary key
 * title - text, nn
 * salary - int
 * equity - numeric
 * company_handle - varchar, nn, fk
 */
// create
describe("test create", function() {
     // works
    const newJob = {
        title: 'new job',
        salary: 50000,
        equity: '0.3',
        company_handle: 'c3'
    };

    test("works", async function() {
        let job = await Job.create(newJob)
        expect(job).toMatchObject({
            id: expect.any(Number),
            ...newJob});

        // Confirm in db
        const result = await db.query(
        `SELECT title, salary, equity, company_handle
        FROM jobs
        WHERE title = 'new job'`);

        expect(result.rows).toEqual([
            {
            title: 'new job',
            salary: 50000,
            equity: '0.3',
            company_handle: 'c3'
            },
        ])
    })
})

// findAll  
describe("test findAll", function() {
     // works: no filter
    test("works: no filter", async function() {
        const jobs = await Job.findAll();

        expect(jobs).toMatchObject([
            {
                id: expect.any(Number), 
                title: 'j1',
                salary: 10000,
                equity: '0.1',
                company_handle: 'c1'
            },
            {
                id: expect.any(Number),
                title: 'j1',
                salary: 20000,
                equity: '0.1',
                company_handle: 'c2'
            },
            {
                id: expect.any(Number),
                title: 'j1',
                salary: 50000,
                equity: '0.0',
                company_handle: 'c3'
            },
            {
                id: expect.any(Number),
                title: 'j3',
                salary: 30000,
                equity: '0.0',
                company_handle: 'c2'
            },
            {
                id: expect.any(Number),
                title: 'j4',
                salary: 40000,
                equity: '0.4',
                company_handle: 'c2'
            },
            
        ])
        
    })

    test("works: filter", async function() {

    })

    test("ignores invalid params", async function () {
        
    })
})
       
// get
describe("get", function () {
    // works
    test("works", async function() {
        const newJob = await db.query(`
        INSERT INTO jobs (title, salary, equity, company_handle)
        VALUES ('getJob', 5000, .01, 'c3')
        RETURNING id`)
        const jobId = newJob.rows[0].id

        const result = await Job.get(jobId)

        expect(result).toEqual(
            {
                id: parseInt(`${jobId}`),
                title: 'getJob',
                salary: 5000,
                equity: '0.01',
                company_handle: 'c3'
            }
        )
    })
        // returns notFound
    test("returns notFound error", async function() {
        try{
            await Job.get(1000);
            fail()
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
        
    })
})
 
// TODO - Test following Methods
// update
describe("update", function () {
    
    // works
    test("works", async function() {
        
    })
    // works partial data
    test("works: partial data", async function() {
        
    })
    // returns notFound
    test("returns notFound error", async function() {
        
    })
})
        
// remove
describe("remove", function () {
    // works
    test("works", async function() {
        
    })
    // returns notFound
    test("returns notFound error", async function() {

    })
})
        