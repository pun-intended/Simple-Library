"use strict";

const request = require("supertest");

const app = require("../app");
const Book = require("../models/book")

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

describe("GET /books/", function() {
    test("works for users", async function(){})

        // TODO - After middleware added
    // test("unauth for anon", async function(){})
})

describe("GET /books/:id", function() {
    test("works for users", async function(){})

        // TODO - After middleware added
    // test("unauth for anon", async function(){})

    test("not found if book not found", async function(){})
})

describe("GET /books/outstanding", function() {
    test("works for users", async function(){})

        // TODO - After middleware added
    // test("unauth for anon", async function(){})
})

describe("POST /books/:id/checkout", function() {
    test("works for users", async function(){})

    // TODO - After middleware added
    // test("unauth for anon", async function(){})

    test("not found if book not found", async function(){})

    // TODO - After validation added
    // test("bad request if invalid data", async function(){})
})

describe("POST /books/:id/checkin", function() {
    test("works for users", async function(){})

    // TODO - After middleware added
    // test("unauth for anon", async function(){})

    test("not found if book not found", async function(){})

    // TODO - After validation added
    // test("bad request if invalid data", async function(){})
})