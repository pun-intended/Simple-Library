"use strict";

const request = require("supertest");

const Job = require("../models/job")
const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");
const { NotFoundError } = require("../expressError");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("/POST jobs", function () {
        const newJob = {
            title: "new job",
            salary: 10000,
            equity: 0.2,
            company_handle: "c1"
        }
    test("works for admin", async function() {
        const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${adminToken}`);

        expect(resp.statusCode).toBe(201)
        expect(resp.body).toMatchObject(
            {job:{
                id: expect.any(Number),
                title: "new job",
                salary: 10000,
                equity: '0.2',
                company_handle: "c1"
            }})
    })
    test("fails for user", async function() {
        const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${u1Token}`);

        expect(resp.statusCode).toBe(401)
    })
    test("fails for user", async function() {
        const resp = await request(app)
        .post("/jobs")
        .send(newJob)

        expect(resp.statusCode).toBe(401)
    })
    test("fails for invalid data", async function() {
        const newJob = {
            title: "new job",
            salary: "Wrong",
            equity: 0.2,
            company_handle: "c1"
        }

        const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${adminToken}`);

        expect(resp.statusCode).toBe(400)
    })
})

describe("/GET jobs", function () {
    test("works for user", async function() {
        const resp = await request(app)
        .get("/jobs")
        .set("authorization", `Bearer ${u1Token}`);

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toMatchObject(
            {jobs: [
                {
                id: expect.any(Number),    
                title:"test1",
                salary: 1000,  
                equity: "0.4",
                company_handle:"c1",
                },
                {
                id: expect.any(Number),
                title:"test2",
                salary: 2000,  
                equity: "0.01",
                company_handle:"c3",
                },
                {
                id: expect.any(Number),
                title:"test3",
                salary: 3000,  
                equity: "0.03",
                company_handle:"c3",
                  },
            ]}
        )
    })
        
    test("fails for anon", async function() {
        const resp = await request(app)
        .get("/jobs");

        expect(resp.statusCode).toBe(401)
    })

    test("works: filter", async function () {
        const filterStr = "minSalary=2000&hasEquity=true"
        
        const resp = await request(app)
        .get(`/jobs?${filterStr}`)
        .set("authorization", `Bearer ${u1Token}`)

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toMatchObject({
            jobs: [
                {
                    id: expect.any(Number),
                    title: "test2",
                    salary: 2000,
                    equity: "0.01",
                    company_handle: "c3"
                },
                {
                    id: expect.any(Number),
                    title: "test3",
                    salary: 3000,
                    equity: "0.03",
                    company_handle: "c3"
                },
            ]
        })
    })
})

describe("/PATCH jobs", function () {

    test("works for admin", async function() {
        const jobs = await db.query(`
        SELECT id, company_handle 
        FROM jobs`)

        const updateData = {
            title: "new",
            salary: 100000,
            equity: 0.1
        }

        const updateId = jobs.rows[0].id

        const resp = await request(app)
        .patch(`/jobs/${updateId}`)
        .send(updateData)
        .set("authorization", `Bearer ${adminToken}`);

        expect(resp.statusCode).toBe(200)

        const updatedJob = await Job.get(updateId)
        expect(updatedJob).toEqual({
            id: updateId,
            title: "new",
            salary: 100000,
            equity: '0.1',
            company_handle: jobs.rows[0].company_handle
        })
    })

    test("fails for user", async function() {
        const jobs = await db.query(`
        SELECT id, company_handle FROM jobs`)

        const updateData = {
            title: "new",
            salary: 100000,
            equity: 0.0
        }

        const updateId = jobs.rows[0].id
        
        const resp = await request(app)
        .patch(`/jobs/${updateId}`)
        .send(updateData)
        .set("authorization", `Bearer ${u1Token}`)

        expect(resp.statusCode).toBe(401)
    })

    test("fails for anon", async function() {
        const jobs = await db.query(`
        SELECT id, company_handle FROM jobs`)

        const updateData = {
            title: "new",
            salary: 100000,
            equity: 0.0
        }

        const updateId = jobs.rows[0].id
        
        const resp = await request(app)
        .patch(`/jobs/${updateId}`)
        .send(updateData)
        .set("authorization", `Bearer ${u1Token}`)

        expect(resp.statusCode).toBe(401)
    })

    test("fails for invalid data", async function() {
        const jobs = await db.query(`
        SELECT id, company_handle FROM jobs`)

        const updateData = {
            title: 100,
            salary: "nope",
            equity: 0.0
        }

        const updateId = jobs.rows[0].id
        
        const resp = await request(app)
        .patch(`/jobs/${updateId}`)
        .send(updateData)
        .set("authorization", `Bearer ${adminToken}`)

        expect(resp.statusCode).toBe(400)
    })

    test("returns 404", async function() {
        const updateData = {
            title: "new",
            salary: 100000,
            equity: 0.0
        }
        
        const resp = await request(app)
        .patch(`/jobs/0`)
        .send(updateData)
        .set("authorization", `Bearer ${adminToken}`)

        expect(resp.statusCode).toBe(404)

    })
})

describe("/DELETE jobs", function () {

    test("works for admin", async function() {
        const jobs = await db.query(`
        SELECT id FROM jobs
        `)
        const deleteId = jobs.rows[0].id

        const resp = await request(app)
        .delete(`/jobs/${deleteId}`)
        .set("authorization", `Bearer ${adminToken}`)

        expect(resp.statusCode).toBe(200)
    })

    test("fails for user", async function() {
        const jobs =await db.query(`
        SELECT id FROM jobs
        `)
        const deleteId = jobs.rows[0].id

        const resp = await request(app)
        .delete(`/jobs/${deleteId}`)
        .set('authorization', `Bearer ${u1Token}`)

        expect(resp.statusCode).toBe(401)
    })

    test("fails for anon", async function() {
        const jobs = await db.query(`
        SELECT id FROM jobs
        `)
        const deleteId = jobs.rows[0].id

        const resp = await request(app)
        .delete(`/jobs/${deleteId}`)

        expect(resp.statusCode).toBe(401)
    })

    test("returns 404", async function() {

        const resp = await request(app)
        .delete(`/jobs/0`)
        .set("authorization", `Bearer ${adminToken}`)

        expect(resp.statusCode).toBe(404)
    })
})
