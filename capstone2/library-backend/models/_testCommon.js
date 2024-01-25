const db = require("../db.js");
const User = require("../models/user");
const Book = require("../models/book");
const Student = require("../models/student");
const { createToken } = require("../helpers/tokens");

// TODO - Rerun tests, correct data reference errors

async function commonBeforeAll() {


    await db.query(
      `DELETE FROM users`
    )

    await db.query(
      `DELETE FROM students`
    )

    await db.query(
      `DELETE FROM books`
    )

    await db.query(
      `DELETE FROM borrow_record`
    )

    await db.query(`
    INSERT INTO users (id, first_name, last_name, password, is_admin) 
    VALUES 
    ('10001', 'test', 'user', 
    '$2a$04$xFzPKDfXTbO2bzBAzoCw9.RBJiX3vxiQpd/22I6w6P1alg1TTKK6K', FALSE),
    ('10002', 'test', 'user2', 
    '$2a$04$xFzPKDfXTbO2bzBAzoCw9.RBJiX3vxiQpd/22I6w6P1alg1TTKK6K', FALSE),
    ('10003', 'admin', 'user2', 
    '$2a$04$xFzPKDfXTbO2bzBAzoCw9.RBJiX3vxiQpd/22I6w6P1alg1TTKK6K', TRUE)`
    );

    await db.query(
    `INSERT INTO students (id, first_name, last_name, level)
    VALUES 
    ('1001', 'Charlie', 'Kelly', 'K1'),
    ('1002', 'Dennis', 'Reynolds', 'K3'),
    ('1003', 'Ronald', 'McDonald', 'K2'),
    ('1004', 'Deandra', 'Reynolds', 'K3'),
    ('1005', 'Frank', 'Reynolds', 'K3'),
    ('1006', 'Matty', 'Mara', 'K1')`
    )

    await db.query(
    `INSERT INTO books (id, isbn, title, stage, condition)
    VALUES
    ('101', '978-0-7653-2635-5', 'The Way of Kings', 2, 'good'),
    ('102', '978-0-7653-2636-2', 'Words of Radiance', 2, 'great'),
    ('103', '978-0-7653-2637-9', 'Oathbringer', 2, 'good'),
    ('104', '978-0765326386', 'Rhythms of War', 3, 'good'),
    ('111', '978-0-316-33283-5', 'Persepolis Rising', 4, 'good'),
    ('112', '978-0-316-33286-6', 'Tiamat''s Wrath', 1, 'great'),
    ('113', '978-0-316-33291-0', 'Leviathan Falls', 2, 'poor')
    `)

    await db.query(`
    INSERT INTO borrow_record (student_id, book_id, borrow_date, return_date)
    VALUES 
    ('1001', '102', '2023-10-10', '2023-10-17'),
    ('1001', '103', '2023-10-17', '2023-10-24'),
    ('1001', '104', '2023-10-24', NULL),
    ('1003', '113', '2023-10-27', NULL),
    ('1005', '112', '2023-10-19', NULL),
    ('1004', '111', '2023-10-18', NULL),
    ('1006', '102', '2023-10-17', NULL)`)
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