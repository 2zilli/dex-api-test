const express = require("express");
const philipApiTest = require("./philipApiTest");

module.exports = (app) => {
    app.use("/api", philipApiTest);
};
