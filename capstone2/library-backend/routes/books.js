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


/**
 * Get all books
 */
router.get("/", async function (req, res, next) {
    const books = await Book.getAllBooks();

    return res.json({ books });
})

/**
 * Get book
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

/**
 * Get outstanding books
 */
router.get("/outstanding", async function(rec, res, next) {
    // TODO - Class filter
    const books = await Book.getOutstanding();

    return res.json({ books });
})

/**
 * Check out book to student
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

/**
 * Check in outstanding book
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
 */

/**
 * Delete book
 */


/**
 * Update book 
 */
router.patch("/:id/update", async function (req, res, next) {
    
})
module.exports = router;