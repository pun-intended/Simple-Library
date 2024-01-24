"use strict";

const request = require("supertest");

const app = require("../app");
const Student = require("../models/student")

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
    } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /students/", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/students")
            .set("authorization", `Bearer ${u1Token}`)
        
        const students = resp.body.students
        expect(resp.statusCode).toEqual(200);
        expect(students.length).toEqual(10);
        expect(students[0]).toEqual({
            id: 1001, 
            first_name: 'Charlie', 
            last_name: 'Kelly', 
            level: 'K1'
        })

    })

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/students")
        
        expect(resp.statusCode).toEqual(401)
    })
    
})

describe("GET /students/:id", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/students/1001")
            .set("authorization", `Bearer ${u1Token}`)

        expect(resp.body).toEqual({
            student: {
            id: 1001, 
            first_name: 'Charlie', 
            last_name: 'Kelly', 
            level: 'K1'
    }})
    })

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/students/1001")
        
        expect(resp.statusCode).toEqual(401)
    })

    test("not found if student not found", async function(){
        const resp = await request(app)
            .get("/students/1")
            .set("authorization", `Bearer ${u1Token}`);

        expect(resp.statusCode).toEqual(404);
    })
})

describe("GET /students/:id/unread", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/students/1001/unread")
            .set("authorization", `Bearer ${u1Token}`)

        const unread = resp.body.unread
        expect(unread.length).toEqual(10)
        expect(unread[0]).toEqual({
            id: 101, 
            isbn: '978-0-7653-2635-5',
            title: 'The Way of Kings', 
            stage: 2, 
            condition: 'good'
        })
    })

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/students/1001/unread")

        expect(resp.statusCode).toEqual(401)
    })

    test("not found if student not found", async function(){
        const resp = await request(app)
            .get("/students/1/unread")
            .set("authorization", `Bearer ${u1Token}`)

        expect(resp.statusCode).toEqual(404)
    })
})