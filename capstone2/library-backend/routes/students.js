"use strict";
// TODO - add detailed definitions
// TODO - add authorization
// TODO - add validation

/** Routes for companies. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const Student = require("../models/student");

// const schema = require("../schemas/schema.json");

const router = new express.Router();

/**
 * Get all students
 */
router.get("/", async function (req, res, next) {
    try{
        const students = await Student.getAllStudents();
        return res.json({students});
    }catch(e){
        return next(e);
    }
})

/**
 * Get student for a given student ID
 * 
 */
router.get("/:id", async function (req, res, next) {
    try{
        const student = await Student.getStudent(req.params.id);
        return res.json({student});
    } catch(e) {
        return next(e);
    }
})

/**
 * Get unread books for a given student
 */
router.get("/:id/unread", async function (req, res, next) {
    try{
        const unread = await Student.getUnreadBooks(req.params.id);
        return res.json({unread});
    }catch(e){
        return next(e);
    }
})