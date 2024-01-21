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

/** Token */



module.exports = router;