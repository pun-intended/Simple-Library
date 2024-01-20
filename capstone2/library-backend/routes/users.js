"use strict";
// TODO - add definitions
// TODO - add validation
// TODO - add authorization
/** Routes for users. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

// const schema = require("../schemas/schema.json");

const router = new express.Router();

/** Add user */
router.post("/", async function (req, res, next) {
    // Add Validation
    try{
        const user = await User.create(req.body)
        const token = createToken(user)
        return res.status(201).json({ user, token })
    }catch(e){
        return next(e)
    }
})

/** Get all users */
router.get("/", async function (req, res, next) {
    try{
        const users = await User.getAll();
        return res.json({users})
    } catch (e) {
        return next(e)
    }
});

/** Get user by ID */
router.get("/:id", async function (req, res, next) {
    try{
        const user = await User.get(req.params.id);
        return res.json({user})
    } catch (e) {
        return next(e)
    }
})

/** Update user */
router.patch("/:id", async function (req, res, next) {
    try{
        // Add validation
        const user = await User.update(req.params.id, req.body);
        return res.json({user})
    } catch (e) {
        return next(e)
    }
})

/** Delete user */
router.delete("/:id", async function (req, res, next) {
    try{
        await User.delete(req.params.id);
        return res.json({deleted: req.params.id})
    } catch (e) {
        return next(e)
    }
})



module.exports = router;