"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin, 
  ensurePermission
} = require("./auth");


const { SECRET_KEY } = require("../config");
const e = require("express");
const testJwt = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", isAdmin: false }, "wrong");
const adminJwt = jwt.sign({ username: "test2", isAdmin: true }, SECRET_KEY);

describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
     //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works: invalid token", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});


describe("ensureLoggedIn", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", is_admin: false } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

// TODO - test ensureAdmin function
describe("ensureAdmin", function() {
  test("works", function() {
    expect.assertions(1) // Used to check errors that are thrown are caught?

    const req = {}
    const res = { locals: { user: {username: "test2", is_admin: true }}}
    const next = function(err) {
      expect(err).toBeFalsy()
    };
    ensureAdmin(req, res, next)
  })

  test("Unauth if not admin", function() {
    expect.assertions(1) // Used to check errors that are thrown are caught?

    const req = {}
    const res = { locals: { user: {username: "test2", is_admin: false} }}
    const next = function(err) {
      expect(err instanceof UnauthorizedError).toBeTruthy()
    };
    ensureAdmin(req, res, next)
  })
})

describe("ensureCorrectUser", function() {
  test("works: correct user", function () {
    expect.assertions(1);
    const testName = "test2"
    const req = {params: {username: `${testName}`}};
    const res = { locals: { user: {username: `${testName}`, is_admin: false} }}
    const next = function(err) {
      expect(err).toBeFalsy()
    };
    ensurePermission(req, res, next)
  });

  test("works: admin", function () {
    expect.assertions(1);
    const testName = "testAdmin"
    const req = {params: {username: `${testName}`}};
    const res = { locals: { user: {username: `${testName}`, is_admin: true} }}
    const next = function(err) {
      expect(err).toBeFalsy()
    };
    ensurePermission(req, res, next)
  })

  test("Fails: neither admin nor user", function () {
    expect.assertions(1);
    const testName = "testWrong"
    const req = {params: {username: "testWrong"}};
    const res = { locals: { user: {username: `test2`, is_admin: false} }}
    const next = function(err) {
      expect(err instanceof UnauthorizedError).toBeTruthy()
    };
    ensurePermission(req, res, next)
  })
})