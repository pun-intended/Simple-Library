
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

describe("test create", function() {

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


describe("test findAll", function() {

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
       

describe("get", function () {

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

    test("returns notFound error", async function() {
        try{
            await Job.get(0);
            fail()
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
        
    })
})
 
describe("update", function () {
    test("works", async function() {
        const updateJob = await Job.create({
            title: 'update', 
            salary: 1000, 
            equity: 0.01, 
            company_handle: 'c1'})
        const updateId = updateJob.id
        console.log(`UPDATE ID ----- ${updateId}`)

        const updateData = {
            title: 'new', 
            salary: 7000, 
            equity: '0.05', 
            company_handle: 'c2'}

        const job = await Job.update(updateId, updateData)

        expect(job).toEqual({
            id: updateId,
            ...updateData
        })
    })
    test("works: partial data", async function() {
        const updateJob = await Job.create({
            title: 'update', 
            salary: 1000, 
            equity: 0.01, 
            company_handle: 'c1'})
        const updateId = updateJob.id
        console.log(`UPDATE ID ----- ${updateId}`)

        const updateData = {
            title: 'new'}

        const job = await Job.update(updateId, updateData)

        expect(job).toEqual({
            id: updateId,
            title: 'new', 
            salary: 1000, 
            equity: '0.01', 
            company_handle: 'c1'
        })
    })
    test("returns notFound error", async function() {
        const updateData = {
            title: 'new', 
            salary: 7000, 
            equity: '0.05', 
            company_handle: 'c2'}

        try{
            const result = await Job.update(0, updateData)
            fail()
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})
        
describe("remove", function () {
    test("works", async function() {
        const allIds = await db.query(`
        SELECT id
        FROM jobs
        `)

        const deleteId = allIds.rows[0].id
        console.log(`----- ID->  ${deleteId}`)
        const result = await Job.remove(deleteId)

        expect(result).toEqual({message: "Deleted"})
        
        // Check db for deletion
        try{
            const job = await Job.get(deleteId)
            fail()
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }


    })

    test("returns notFound error", async function() {
        try{
            const missing = await Job.remove(0)
            fail()
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})
        