const db = require("../db.js");
const User = require("../models/user");
const Book = require("../models/book");
const Student = require("../models/student");
const { createToken } = require("../helpers/tokens");


async function commonBeforeAll() {
    await User.register({
        id: "1",
        first_name: "U1F",
        last_name: "U1L",
        password: "password1",
        is_admin: false,
      });
      await User.register({
        id: "2",
        first_name: "U2F",
        last_name: "U2L",
        password: "password2",
        is_admin: false,
      });

    }
    

async function commonBeforeEach() {
    await db.query("BEGIN");
}
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
}
  
  async function commonAfterAll() {
    await db.end();
}

const u1Token = createToken({ id: "1", isAdmin: false });
const u2Token = createToken({ id: "2", isAdmin: false });
const adminToken = createToken({ id: "3", isAdmin: true });


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
  };