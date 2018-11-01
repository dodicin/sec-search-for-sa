"use strict";

const express = require("express");
//const pg = require("pg");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// DB
//pg.connect('postgres://dbuser:dbpassword@localhost:5432');

// App
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/assets/style.css", function(req, res) {
  res.sendFile(__dirname + "/src/assets/style.css");
});

app.get("/api/article/:id", function(req, res) {
  // PostegresSQL call
  const module = require("./mock.js");
  res.send(module.article[req.params.id]);
});

app.get("/api/articlesNames", function(req, res) {
  // PostegresSQL call
  const module = require("./mock.js");
  res.send(module.articlesNames);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
