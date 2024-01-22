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

describe("GET /books/", function() {})

describe("GET /books/:id", function() {})

describe("GET /books/outstanding", function() {})

describe("POST /books/:id/checkout", function() {})

describe("POST /books/:id/checkin", function() {})