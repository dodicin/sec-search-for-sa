"use strict";

const express = require("express");
const { Client } = require("pg");

const NODE_PORT = 1010;
const HOST = "0.0.0.0";

const connString = "postgres://dbuser:dbpassword@db:5432/articlesdb";

const client = new Client({
  connectionString: connString
});
client.connect();

const app = express();

app.listen(NODE_PORT, HOST);

console.log(`Running on http://${HOST}:${NODE_PORT}`);

// API

app.get("/api/article/:id", (req, res) => {
  const { id } = req.params;
  if (!isNaN(parseInt(id))) {
    client
      .query("SELECT * FROM articles WHERE id = $1", [id])
      .then(data => {
        res.send(data.rows.length > 0 && data.rows[0]);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    console.log("id type is not number");
    res.sendStatus(500);
  }
});

app.get("/api/articlesNames", (req, res) => {
  client
    .query("SELECT id, title FROM articles")
    .then(data => {
      res.send(data.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// ROUTING

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/assets/style.css", (req, res) => {
  res.sendFile(__dirname + "/src/assets/style.css");
});

app.get("/assets/autocomplete.js", (req, res) => {
  res.sendFile(__dirname + "/src/assets/autocomplete.js");
});
