"use strict";

/** Routes for companies. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const User = require("../models/user");

// const schema = require("../schemas/schema.json");

const router = new express.Router();