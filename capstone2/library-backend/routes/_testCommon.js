const db = require("../db.js");
const User = require("../models/user");
const Book = require("../models/book");
const Student = require("../models/student");
const { createToken } = require("../helpers/tokens");


// TODO- ADD COMMON TEST INFO, DELETE LIBRARY TEST
// TODO - Rerun tests, correct data reference errors

async function commonBeforeAll() {
    
    // Correct Users
    await User.create({
        id: "1",
        first_name: "U1F",
        last_name: "U1L",
        password: "password1",
        is_admin: false,
      });
      await User.create({
        id: "2",
        first_name: "U2F",
        last_name: "U2L",
        password: "password2",
        is_admin: false,
      });

      // Add students

      // Add books

      // Add records



    }
    

async function commonBeforeEach() {
    await db.query("BEGIN");
}
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
}
  
  async function commonAfterAll() {
    await User.remove(1)
    await User.remove(2)
    await db.end();
}

const u1Token = createToken({ id: "10001", isAdmin: false });
const u2Token = createToken({ id: "10002", isAdmin: false });
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