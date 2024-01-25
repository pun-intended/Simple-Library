"use strict";

const request = require("supertest");

const app = require("../app");
const Book = require("../models/book");

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

describe("GET /books/", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/books")
            .set("authorization", `Bearer ${u1Token}`);

        expect(resp.statusCode).toEqual(200);
        
        const allBooks = resp.body.books;

        expect(allBooks.length).toEqual(13);
        expect(allBooks[0]).toEqual({
            id: 101, 
            isbn: '978-0-7653-2635-5',
            title: 'The Way of Kings', 
            stage: 2, 
            condition: 'good'
        });
    });

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/books");
            
        expect(resp.statusCode).toEqual(401);
    });
});

describe("GET /books/:id", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/books/101")
            .set("authorization", `Bearer ${u1Token}`);

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            book: {
            book_id: 101, 
            isbn: '978-0-7653-2635-5',
            title: 'The Way of Kings', 
            stage: 2, 
            condition: 'good'
            }});
    });

    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/books/101")
        
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if book not found", async function(){
        const resp = await request(app)
            .get("/books/1")
            .set("authorization", `Bearer ${u1Token}`)
        
        expect(resp.statusCode).toEqual(404);
    });
});

// TODO - Why is this throwing an error?
describe("GET /books/outstanding", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .get("/books/outstanding")
            .set("authorization", `Bearer ${u1Token}`);
        
        expect(resp.statusCode).toEqual(200);

        expect(resp.body.length).toEqual(5);
        expect(resp.body[0]).toEqual({
            books: {
            book_id: 104, 
            isbn: '978-0765326386', 
            title: 'Rhythms of War', 
            stage: 3, 
            condition: 'good'
            }});
    });

        // TODO - After middleware added
    test("unauth for anon", async function(){
        const resp = await request(app)
            .get("/books/outstanding")

            expect(resp.statusCode).toEqual(401);
    });
});

describe("POST /books/checkout", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .post("/books/checkout")
            .send({
                book_id: 103,
                student_id: 1002, 
                date: "12-12-2024"})
            .set("authorization",`Bearer ${u1Token}`);
        
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            borrowed: {
                id: expect.any(Number),
                book_id: 103,
                student_id: 1002,
                borrow_date: "12-12-2024"
            }
        });
    });

    // TODO - After middleware added
    test("unauth for anon", async function(){
        const resp = await request(app)
            .post("/books/checkout")
            .send({
                book_id: 103,
                student_id: 1002, 
                date: "12-12-2024"});
        
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if book not found", async function(){
        const resp = await request(app)
            .post("/books/checkout")
            .send({
                book_id: 1,
                student_id: 1002, 
                date: "12-12-2024"})
            .set("authorization",`Bearer ${u1Token}`);
        
        expect(resp.statusCode).toEqual(404);
    });

    test("not found if student not found", async function(){
        const resp = await request(app)
            .post("/books/checkout")
            .send({
                book_id: 103,
                student_id: 1, 
                date: "12-12-2024"})
            .set("authorization",`Bearer ${u1Token}`);
        
        expect(resp.statusCode).toEqual(404);
    });

    // TODO - After validation added
    test("bad request if invalid data", async function(){
        const resp = await request(app)
            .post("/books/checkout")
            .send({
                book_id: "string",
                student_id: 1001,
                date: "12-12-2024"
            })
            .set("authorization",`Bearer ${u1Token}`);

        expect(resp.statusCode).toEqual(400);
    });

    test("bad request if missing data", async function(){
        const resp = await request(app)
            .post("/books/checkout")
            .send({
                book_id: 106,
                date: "12-12-2024"
            })
            .set("authorization",`Bearer ${u1Token}`);

        expect(resp.statusCode).toEqual(400);
    });

    // TODO - FUTURE FEATURE
    // test("book can not be checked out if already out", async function(){})

    // TODO - FUTURE FEATURE
    // test("student can not borrow 2 books at once", async function(){})
});

describe("POST /books/checkin", function() {
    test("works for users", async function(){
        const resp = await request(app)
            .post("/books/checkin")
            .send({
                book_id: 104,
                date: "12-12-2024"
            })
            .set("authorization", `Bearer ${u1Token}`);

        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({
            returned: {
                id: expect.any(Number),
                return_date: "12-12-2024"
            }
        });
    });

    // TODO - After middleware added
    test("unauth for anon", async function(){
        const resp = await request(app)
            .post("/books/checkin")
            .send({
                book_id: 104,
                date: "12-12-2024"
            });

        expect(resp.statusCode).toEqual(401);
    });

    test("not found if record not found", async function(){
        const resp = await request(app)
            .post("/books/checkin")
            .send({
                book_id: 1,
                date: "12-12-2024"
            })
            .set("authorization", `Bearer ${u1Token}`)

        expect(resp.statusCode).toEqual(404);
    });

    // TODO - After validation added
    test("bad request if invalid data", async function(){
        const resp = await request(app)
        .post("/books/checkin")
        .send({
            book_id: 106
        })
        .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toEqual(400)
    });
});