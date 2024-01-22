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
    test("works for users", async function(){})

    test("unauth for anon", async function(){})
    
})

describe("GET /students/:id", function() {
    test("works for users", async function(){})

    test("unauth for anon", async function(){})

    test("not found if student not found", async function(){})
})

describe("GET /students/:id/unread", function() {
    test("works for users", async function(){})

    test("unauth for anon", async function(){})

    test("not found if student not found", async function(){})
})