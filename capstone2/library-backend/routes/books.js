"use strict";

/** Routes for books. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Book = require("../models/book");

// const schema = require("../schemas/schema.json");

const router = new express.Router();


/** GET / {books: [{id, isbn, title, stage, condition}...]}
 * 
 * Returns all books in library
 * 
 * Auth: login
 */

// TODO - STRETCH - add stage filter
router.get("/", ensureLoggedIn, async function (req, res, next) {
    const books = await Book.getAllBooks();

    return res.json({ books });
})

/** GET /[id] => {book}
 * 
 * Returns {id, isbn, title, stage, condition}
 * 
 * Auth: login
 */
router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        // validate schema
        const book = await Book.getBook(req.params.id);
        return res.json({ book });
    } catch (e) {
        return next(e);
    }
})

/** GET /outstanding => {books: [{id, isbn, title, stage, condition}, ...]}
 * 
 * Returns all books that are still outstanding
 * 
 * Auth: login
 */
router.get("/outstanding", ensureLoggedIn, async function(rec, res, next) {
    // TODO - Class filter
    const books = await Book.getOutstanding();

    return res.json({ books });
})

/** POST /[id]/checkout {book_id, student_id, date}
 *                  => {borrowed: {id, book_id, student_id, borrow_date}}
 * 
 * Returns borrow_record object for book
 * 
 * Auth: login
 */
// QUESTION - Would these two better without the url params? send the ID in the post request?
router.post("/checkout", ensureLoggedIn, async function (req, res, next) {
    // TODO - add validation
    try{
        const data = req.body
        const borrowed = await Book.checkOut(req.body);
        return res.status(201).json({ borrowed });
    } catch (e) {
        return next(e);
    }
})

/** POST /[id]/checkin {book_id, date} => {returned: {id, return_date}}
 * 
 * Returns {Returned: {id, return_date}}
 * 
 * Auth: login
 */
// QUESTION - Would these two better without the url params? send the ID in the post request?
router.post("/checkin", ensureLoggedIn, async function (req, res, next) {
    // TODO - add validation
    try{
        const returned = await Book.checkIn(req.body);
        return res.status(201).json({ returned });
    }catch(e){
        return next(e);
    }
})


// TODO ---- STRETCH 

/**
 * Add book
 * 
 * Auth: admin
 */

/**
 * Delete book
 * 
 * Auth: admin
 */


/**
 * Update book 
 * 
 * Auth: login
 */
router.patch("/:id/update", async function (req, res, next) {
    
})
module.exports = router;