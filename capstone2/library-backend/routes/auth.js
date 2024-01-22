"use strict";

/** Routes for auth. */

// TODO - add schema

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const User = require("../models/user");

// const schema = require("../schemas/schema.json");

const router = new express.Router();

/** POST /auth/register { user } => { token }
 * 
 * user should be {id, first_name, last_name, password}
 * 
 * Returns JWT for the user
 * 
 * Auth: none
 */
router.post("/register", async function(req, res, next){
    // TODO - add validation
    
    try{
        const data = req.body;
        const user = await User.create({...data, is_admin: false});
    
        const token = createToken(user);
        return res.status(201).json({token});
    } catch (e) {
        return next(e);
    };
});

/** POST /auth/token { id, password } => { token }
 * 
 * Returns JWT for user
 * 
 * Auth: none
 */
router.post("/token", async function(req, res, next){
    // TODO - Add validation
    try{
        const { id, password } = req.body;
        const user = User.authenticate({id, password});

        const token = createToken(user);
        return res.json({token});
    } catch (e) {
        return next(e);
    };
});


module.exports = router;