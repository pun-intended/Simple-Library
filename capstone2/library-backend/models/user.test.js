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

// getUser
    // works, throws error

// getAll
    // works

// remove
    // works, throws error

// updateUser
    // works, works with partial update, throws error

// authenticate
    // works, throws error

