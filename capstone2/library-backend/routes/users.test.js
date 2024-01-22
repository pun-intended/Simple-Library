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

describe("POST /users/", function() {})

describe("GET /users/", function() {})

describe("GET /users/:id", function() {})

describe("PATCH /user/:id", function() {})

describe("DELETE /users/:id", function() {})