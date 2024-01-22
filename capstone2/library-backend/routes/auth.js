"use strict";

/** Routes for auth. */

// TODO - add routes
// TODO - add detailed documentation
// TODO - add schema

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const User = require("../models/user");

// const schema = require("../schemas/schema.json");

const router = new express.Router();

/** Register */
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

/** Token */
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