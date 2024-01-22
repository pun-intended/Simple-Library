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
    test("works for anon", async function(){})

    test("bad request with missing fields", async function(){})

    // TODO - after validation
    // test("bad request with invalid data", async function(){})
})

describe("GET /users/", function() {
    test("Works for users", async function(){})

    test("unauth for anon", async function(){})
})

describe("GET /users/:id", function() {
    test("works for admin", async function(){})

    test("works for same user", async function(){})

    test("unauth for other users", async function(){})

    test("unauth for anon", async function(){})

    test("not found if user not found", async function(){})
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