"use strict";

/** Routes for books. */

// TODO - add detailed documentation

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
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
router.get("/", async function (req, res, next) {
    const books = await Book.getAllBooks();

    return res.json({ books });
})

/** GET /[id] => {book}
 * 
 * Returns {id, isbn, title, stage, condition}
 * 
 * Auth: login
 */
router.get("/:id", async function (req, res, next) {
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
router.get("/outstanding", async function(rec, res, next) {
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
router.post("/:id/checkout", async function (req, res, next) {
    // TODO - add validation
    try{
        const record = await Book.checkOut(req.params.id, req.body);
        return res.status(201).json({ record });
    } catch (e) {
        return next(e);
    }
})

/** POST /[id]/checkin {book_id, date} => {Returned: {id, return_date}}
 * 
 * Returns {Returned: {id, return_date}}
 * 
 * Auth: login
 */
router.post("/:id/checkin", async function (req, res, next) {
    // TODO - add validation
    try{
        const checkin = await Book.checkIn(req.params.id, req.body);
        return res.status(201).json({checkin});
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