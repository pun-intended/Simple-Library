"use strict";
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

/** POST / {user} => {user, token}
 * 
 * user should be {id, first_name, last_name, password, is_admin}
 * 
 * Returns JWT for user
 * 
 * Auth: admin
 */
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

/** GET / => {users: [{user}...]}
 * 
 * user is {id, first_name, last_name, is_admin}
 * 
 * Auth: login
 */
router.get("/", async function (req, res, next) {
    try{
        const users = await User.getAll();
        return res.json({users})
    } catch (e) {
        return next(e)
    }
});

/** GET /[id] => {user}
 * 
 * user is {id, first_name, last_name, is_admin}
 * 
 * Auth: admin, or same user
 */
router.get("/:id", async function (req, res, next) {
    try{
        const user = await User.getUser(req.params.id);
        return res.json({user})
    } catch (e) {
        return next(e)
    }
})

/** PATCH /[id] {data} => {user} 
 * 
 * data can include {firstName, lastName, password, is_admin}
 * 
 * Returns {updated: {id, first_name, last_name, is_admin}}
 * 
 * Auth: admin or same user
 */
router.patch("/:id", async function (req, res, next) {
    try{
        // Add validation
        const user = await User.updateUser(req.params.id, req.body);
        return res.json({user})
    } catch (e) {
        return next(e)
    }
})

/** DELETE /[id] => {deleted: id}
 * 
 * Delete user
 * 
 * Auth: admin or same user
 */
router.delete("/:id", async function (req, res, next) {
    try{
        const deleted = await User.delete(req.params.id);
        return res.json({deleted})
    } catch (e) {
        return next(e)
    }
})



module.exports = router;