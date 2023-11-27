"use strict";

const request = require("supertest");

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

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

    // post - admin
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
    // get - all - login
describe("/GET jobs", function () {
        // works for User
    test("works for admin", async function() {})
        // fails for anon
    test("fails for user", async function() {})
})
    // get - title login
describe("/GET jobs", function () {
        // works for user
    test("works for admin", async function() {})
        // fails for anon
    test("fails for user", async function() {})
        // returns 404
    test("returns 404", async function() {})
})
    // patch - admin
describe("/PATCH jobs", function () {
        // works for admin
    test("works for admin", async function() {})
        // fails for user
    test("fails for user", async function() {})
        // fails for anon
    test("fails for user", async function() {})
        // fails for invalid data
    test("fails for invalid data", async function() {})
        // returns 404
    test("returns 404", async function() {})
})
    // delete - admin
describe("/DELETE jobs", function () {
        // works for admin
    test("works for admin", async function() {})
        // fails for user
    test("fails for user", async function() {})
        // fails for anon
    test("fails for user", async function() {})
        // returns 404
    test("returns 404", async function() {})
})