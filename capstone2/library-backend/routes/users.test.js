"use strict";

const request = require("supertest");

const app = require("../app");
const User = require("../models/user")

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

describe("POST /users/", function() {
    test("works for admin", async function(){
        const resp = await request(app)
            .post("/users")
            .send({
                id: 20001,
                first_name: "test",
                last_name: "last",
                password: "pass",
                is_admin: true
            })
            .set("authorization", `Bearer ${adminToken}`)
        
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({
            user: {
                id: 20001,
                first_name: "test",
                last_name: "last",
                is_admin: true
            },
            token: expect.any(Number)
        });
    })

    test("unauth for users", async function(){
        const resp = await request(app)
            .post("/users")
            .send({
                id: 20001,
                first_name: "test",
                last_name: "last",
                password: "pass",
                is_admin: true
            })
            .set("authorization", `Bearer ${u1Token}`)
        
        expect(resp.statusCode).toEqual(401)
    })

    test("unauth for anon", async function(){
        const resp = await request(app)
            .post("/users")
            .send({
                id: 20001,
                first_name: "test",
                last_name: "last",
                password: "pass",
                is_admin: true
            })
        
        expect(resp.statusCode).toEqual(401)
    })

    test("bad request with missing fields", async function(){
        const resp = await request(app)
            .post("/users")
            .send({
                first_name: "test",
                last_name: "last",
                password: "pass",
                is_admin: true
            })
            .set("authorization", `Bearer ${adminToken}`);

        expect(resp.statusCode).toEqual(400)
    })

    // TODO - after validation
    test("bad request with invalid data", async function(){
        const resp = await request(app)
            .post("/users")
            .send({
                id: "string",
                first_name: "test",
                last_name: "last",
                password: "pass",
                is_admin: true
            })
            .set("authorization", `Bearer ${adminToken}`);

        expect(resp.statusCode).toEqual(400)
    })
})

describe("GET /users/", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/users")
            .set("authorization", `Bearer ${u1Token}`)

        expect(resp.body).toEqual({
            users: [
                {id: 10001,
                first_name:'test', 
                last_name: 'user', 
                is_admin: false},
                
                {id: 10002, 
                first_name: 'test', 
                last_name: 'user2',
                is_admin: true}]
            });
    })

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/users")

        expect(resp.statusCode).toEqual(401)
    })
})

describe("GET /users/:id", function() {
    test("works for admin", async function(){
        const resp = await request(app)
            .get("/users/10001")
            .set("authorization", `Bearer ${adminToken}`)

        expect(resp.body).toEqual({
                id: 10001,
                first_name:'test', 
                last_name: 'user', 
                is_admin: false
            });
    })

    test("works for same user", async function(){
        const resp = await request(app)
            .get("/users/10001")
            .set("authorization", `Bearer ${u1Token}`)

        expect(resp.body).toEqual({
                id: 10001,
                first_name:'test', 
                last_name: 'user', 
                is_admin: false
            });
    })

    test("unauth for other users", async function(){
        const resp = await request(app)
            .get("/users/10001")
            .set("authorization", `Bearer ${u2Token}`)

        expect(resp.statusCode).toEqual(401);
    })

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/users/10001")

        expect(resp.statusCode).toEqual(401);
    })

    test("not found if user not found", async function(){
        const resp = await request(app)
            .get("/users/1")
            .set("authorization", `Bearer ${adminToken}`)

        expect(resp.statusCode).toEqual(404)
    })
})

describe("PATCH /user/:id", function() {
    test("works for admin", async function(){})

    test("works for same user", async function(){})

    test("unauth for other users", async function(){})

    test("unauth for anon", async function(){})

    test("not found if user not found", async function(){})

    // TODO - after validation
    // test("bad request with invalid data", async function(){})
})

describe("DELETE /users/:id", function() {
    test("works for admin", async function(){})

    test("works for same user", async function(){})

    test("unauth for other users", async function(){})

    test("unauth for anon", async function(){})

    test("not found if user not found", async function(){})
})