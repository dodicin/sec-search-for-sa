"use strict";

const express = require("express");
const { Client } = require("pg");

const NODE_PORT = 8080;
const HOST = "0.0.0.0";

const connString = "postgres://dbuser:dbpassword@db:5432/articlesdb";

const client = new Client({
  connectionString: connString
});
client.connect();

// App
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/assets/style.css", (req, res) => {
  res.sendFile(__dirname + "/src/assets/style.css");
});

app.get("/api/article/:id", (req, res) => {
  const { id } = req.param;
  if (typeof id === "number") {
    client
      .query("SELECT * FROM articles WHERE id = $1", [id])
      .then(data => {
        res.send(data.rows);
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

app.listen(NODE_PORT, HOST);

console.log(`Running on http://${HOST}:${NODE_PORT}`);
