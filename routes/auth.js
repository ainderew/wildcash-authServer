const express = require("express");
const Router = express.Router();
const {handleLogin} = require("../controllers/auth.controller");

Router.post("/", handleLogin);

module.exports = Router;
