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

// ---- Methods ----
// ----- checkOut
describe("checkOut", function () {
    let checkOutItem = {
        bookId: '112',
        studentId: '1008',
        date: '12-12-2023'
    };

    test("works", async function () {
        let checkedOut = await Book.checkOut(checkOutItem);
        expect(checkedOut).toEqual({
            ...checkOutItem,
            id: expect.any(Number)
        });
    });

    let wrongBook = {
        bookId: '1120',
        studentId: '1008',
        date: '12-12-2023'
    };
    test("throws NotFoundError on incorrect book", async function() {
        try{
            await Book.checkOut(wrongBook);
            fail()
        } catch (e) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })

    let wrongStudent = {
        bookId: '112',
        studentId: '10008',
        date: '12-12-2023'
    };
    test("throws NotFoundError on incorrect student id", async function() {
        try{
            await Book.checkOut(wrongStudent);
            fail()
        } catch (e) {
            expect(err instanceof NotFoundError).toBeTruthy()
        };
    });
});

// checkIn
describe("checkin", function() {
    let borrowedBook = {
        bookId: '112',
        studentId: '1008',
        date: '12-12-2023'
    };

    test("works", async function() {
        Book.checkOut(borrowedBook);

        let returnData = {
            bookId: '112',
            date: '12-13-2023'
        };

        let returned = await Book.checkIn(returnData)
        expect(returned).toEqual({
            Returned: {
                id: '112',
                returned_date:'12-13-2023'
            }
        });
    });
    test("throws error if book not found", async function() {
        let returnData = {
            bookId: '1120',
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
            bookId: '110', 
            isbn: '978-0-316-33474-7', 
            title: 'Babylon\'s Ashes', 
            stage: '4', 
            condition: 'poor'
        });
    });

    test("works with 'borrowing' field", async function() {
        let book = await Book.getBook('104');

        expect(book).toEqual({
            bookId: '104', 
            isbn: '978-0765326386', 
            title: 'Rhythms of War', 
            stage: '3', 
            condition: 'good', 
            borrowing: {
                id: '1001', 
                firstName: 'Charlie', 
                lastName: 'Kelly', 
                level: 'K1', 
                borrowDate: '10-24-2023'}
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
            id: '101', 
            isbn: '978-0-7653-2635-5', 
            title: 'The Way of Kings', 
            stage: '2', 
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
            bookId: '104', 
            isbn: '978-0765326386', 
            title: 'Rhythms of War', 
            stage: '3', 
            condition: 'good',
            studentId: '1001', 
            firstName: 'Charlie', 
            lastName: 'Kelly', 
            borrowDate: '10-24-2023'
        });
    });
});


