"use strict"

const db = require('../db.js');
const User = require("../models/user")

const {BadRequestError, NotFoundError, UnauthorizedError } = require('../expressError.js');
const {
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
 } = require('./_testCommon.js');

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// ---- User Methods ----

// create
describe("create", function(){
    let newUser = {
        id: 1, 
        first_name: "test", 
        last_name: "user", 
        password: "password", 
        is_admin: false
    }

    test("works", async function(){
        let user = await User.create(newUser);

        expect(user).toEqual({
            id: 1, 
            first_name: "test", 
            last_name: "user", 
            is_admin: false
        });

        const found = await db.query("SELECT * FROM users WHERE id = 1");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(false);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    let dupeId = {
        id: 10001, 
        first_name: "test", 
        last_name: "user", 
        password: "password", 
        is_admin: false
    };

    test("throws BadRequestError for duplicate IDs", async function(){
        try{
            await User.create(dupeId);
            fail();
        } catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy()
        };
    });
});

// getUser
describe("getUser", function(){
    
    test("works", async function(){
        let user = await User.getUser(10001);
        expect(user).toEqual({
            id: 10001, 
            first_name: "test", 
            last_name: "user", 
            is_admin: false
        });
    });

    test("throws error if not found", async function(){
        try{
            await User.getUser(0);
            fail();
        } catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy()
        };
    });
});

// getAll
describe("getAll", function(){
    test("works", async function(){
        let users = await User.getAll();
        expect(users.length).toEqual(2)
        expect(users[0]).toEqual({
            id: 10001, 
            first_name: "test", 
            last_name: "user", 
            is_admin: false
        });
    });
});

// remove
describe("remove", function(){
    test("works", async function(){
        await User.remove(10001);
        const res = await db.query(
            "SELECT * FROM users WHERE id='10001'");
        expect(res.rows.length).toEqual(0);
    });

    test("throws error if not found", async function(){
        try{
            await User.remove(0);
            fail();
        } catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        };
    });
});

// updateUser
describe("updateUser", function(){
    let newData = {
        first_name: "newFirst",
        last_name: "newLast",
        is_admin: true 
        };
    test("works", async function(){
        let updatedData = await User.updateUser(10001, newData);

        expect(updatedData).toEqual({
            id: 10001,
            ...newData
        });
    });

    test("works: update password", async function(){
        let passUpdate = await User.updateUser(10001, {
            password: "new",
          });
          expect(passUpdate).toEqual({
            id: 10001,
            first_name: "test",
            last_name: "user",
            is_admin: false
          });
          const found = await db.query("SELECT * FROM users WHERE id = 10001");
          expect(found.rows.length).toEqual(1);
          expect(found.rows[0].password.startsWith("$2b$")).toEqual(true)
    });

    test("throws error if user not found", async function(){
        try{
            await User.updateUser(1, newData);
            fail();
        } catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        };
    });
});    

// authenticate
describe("authenticate", function(){
    test("works", async function(){
        let user = await User.authenticate(10001, "password");
        expect(user).toEqual({
            id: 10001,
            first_name: "test",
            last_name: "user",
            is_admin: false 
        });
    });

    test("throws error for invalid password", async function(){
        try{
            await User.authenticate(10001, "wrong");
            fail();
        } catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy()
        };
    });
});

