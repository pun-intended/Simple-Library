"use strict"

const db = require('../db.js');
const {BadRequestError, NotFoundError } = require('../expressError.js');
const {
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
 } = require('./_testCommon.js');

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// ---- Methods ----

// create
    // works

// getAllStudents
    // Works

// getStudent(id)
    // works, throws error

// getReadBooks(id)
    // works, throws error

// getUnreadBooks(id)
    // works

