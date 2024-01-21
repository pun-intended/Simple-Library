const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");


async function commonBeforeEach() {
    await db.query("BEGIN");
}

    async function commonAfterEach() {
await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
};