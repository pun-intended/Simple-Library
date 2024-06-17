"use strict";
/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const userCreateSchema = require("../schemas/userCreate.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = new express.Router();

/** POST / {user} => {user, token}
 * 
 * user should be {id, first_name, last_name, password, is_admin}
 * 
 * Returns JWT for user
 * 
 * Auth: admin
 */
router.post("/", ensureAdmin, async function (req, res, next) {
    // Add Validation
    
    try{
        const validator = jsonschema.validate(req.body, userCreateSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }
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
router.get("/", ensureLoggedIn, async function (req, res, next) {
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
router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try{
        const user = await User.getUser(req.params.id);
        return res.json({user})
    } catch (e) {
        return next(e)
    }
})

/** PATCH /[id] {data} => {user} 
 * 
 * data can include {first_name, last_name, password}
 * 
 * Returns {updated: {id, first_name, last_name, is_admin}}
 * 
 * Auth: admin or same user
 */
router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try{
        const validator = jsonschema.validate(req.body, userUpdateSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }
        
        const updated = await User.updateUser(req.params.id, req.body);
        return res.json({updated})
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
router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try{
        const deleted = await User.remove(req.params.id);
        return res.json({deleted})
    } catch (e) {
        return next(e)
    }
})



module.exports = router;