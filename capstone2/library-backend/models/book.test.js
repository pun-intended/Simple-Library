"use strict"

const db = require('../db.js');
const Book = require("./book.js")
const {BadRequestError, NotFoundError } = require('../expressError.js');
const {
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
 } = require('./_testCommon.js');

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// TODO - fix dateTime formatting

// ---- Methods ----
// ----- checkOut
describe("checkOut", function () {
    let checkOutItem = {
        book_id: 112,
        student_id: 1008,
        date: '12-12-2023'
    };

    test("works", async function () {
        let checkedOut = await Book.checkOut(checkOutItem);
        expect(checkedOut).toEqual({
            borrowed: {
                book_id: 112,
                student_id: 1008,
                borrow_date: '12-12-2023',
                id: expect.any(Number)
        }});
    });

    let wrongBook = {
        book_id: 1120,
        student_id: 1008,
        date: '12-12-2023'
    };
    test("throws NotFoundError on incorrect book", async function() {
        try{
            await Book.checkOut(wrongBook);
            fail()
        } catch (e) {
            console.log(e)
            expect(e instanceof NotFoundError).toBeTruthy()
        }
    })

    let wrongStudent = {
        book_id: 112,
        student_id: 10008,
        date: '12-12-2023'
    };
    test("throws NotFoundError on incorrect student id", async function() {
        try{
            await Book.checkOut(wrongStudent);
            fail()
        } catch (e) {
            console.log(e)
            expect(e instanceof NotFoundError).toBeTruthy()
        };
    });
});

// checkIn
describe("checkin", function() {
    let borrowedBook = {
        book_id: 112,
        student_id: 1008,
        date: '12-12-2023'
    };

    test("works", async function() {
        await Book.checkOut(borrowedBook);

        let returnData = {
            book_id: 112,
            date: '12-13-2023'
        };

        let returned = await Book.checkIn(returnData)
        expect(returned).toEqual({
            Returned: {
                id: expect.any(Number),
                return_date:'12-13-2023'
            }
        });
    });
    test("throws error if book not found", async function() {
        let returnData = {
            book_id: 1120,
            date: '12-13-2023'
        };

        try{
            await Book.checkIn(returnData);
            fail();
        } catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        };
    });
});

// getBook
describe("getBook", function() {
    test("works", async function() {
        let book = await Book.getBook('110');

        expect(book).toEqual({
            book_id: 110, 
            isbn: '978-0-316-33474-7', 
            title: 'Babylon\'s Ashes', 
            stage: 4, 
            condition: 'poor'
        });
    });

    test("works with 'borrowing' field", async function() {
        let book = await Book.getBook('104');

        expect(book).toEqual({
            book_id: 104, 
            isbn: '978-0765326386', 
            title: 'Rhythms of War', 
            stage: 3, 
            condition: 'good', 
            student: {
                id: 1001, 
                first_name: 'Charlie', 
                last_name: 'Kelly', 
                level: 'K1', 
                borrow_date: '2023-10-24'}
        });
    });

    test("throws NotFoundError if no book found", async function() {
        try{
            await Book.getBook('1000')
            fail()
        } catch (e) {
            expect(e instanceof NotFoundError).toBeTruthy()
        };
    });
});

// getAllBooks
describe("getAllBooks", function() {
    test("works", async function() {
        let books = await Book.getAllBooks();

        expect(books.length).toEqual(13);

        expect(books[0]).toEqual({
            id: 101, 
            isbn: '978-0-7653-2635-5', 
            title: 'The Way of Kings', 
            stage: 2, 
            condition: 'good'
        });
    });
});

// getOutstanding
describe("getOutstanding", function() {
    test("works", async function(){
        let outstandingBooks = await Book.getOutstanding();

        expect(outstandingBooks.length).toEqual(5)

        expect(outstandingBooks[0]).toEqual({
            book_id: 104, 
            isbn: '978-0765326386', 
            title: 'Rhythms of War', 
            stage: 3, 
            condition: 'good',
            student_id: 1001, 
            first_name: 'Charlie', 
            last_name: 'Kelly', 
            borrow_date: '2023-10-24'
        });
    });
});


