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

describe("GET /students/", function() {})

describe("GET /students/:id", function() {})

describe("GET /students/:id/unread", function() {})