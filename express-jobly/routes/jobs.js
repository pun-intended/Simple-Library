"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = new express.Router();

// TODO Complete routes
router.post('/', ensureAdmin, async function(req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, jobNewSchema)
        console.log(validator.valid)
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        const job = await Job.create(req.body)
        console.log("-----Job created")
        return res.status(201).json({job})
    }catch (err) {
        return next(err)
    }
})

router.get('/',ensureLoggedIn, async function(req, res, next) {

})

router.patch('/:id',ensureAdmin, async function(req, res, next) {

})

router.delete('/:id', ensureAdmin, async function(req, res, next) {

})

module.exports = router