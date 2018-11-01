"use strict";

const express = require("express");
const pg = require("pg");

const NODE_PORT = 8080;
const HOST = "0.0.0.0";

const connString = "postgres://dbuser:dbpassword@db:5432/articlesdb";

const client = new pg.Client({
  connectionString: connString
});

// App
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.get("/assets/style.css", function(req, res) {
  res.sendFile(__dirname + "/src/assets/style.css");
});

app.get("/api/article/:id", function(req, res) {
  client
    .connect()
    .then(function() {
      client.query(
        "SELECT * FROM articles WHERE id = $1",
        [req.params.id],
        function(err, data) {
          res.send(data.rows);
        }
      );
    })
    .catch(function(err) {
      console.error("could not connect to postgres:", err);
      res.sendStatus(500);
    });
  client.end();
});

app.get("/api/articlesNames", function(req, res) {
  client
    .connect()
    .then(function() {
      return client
        .query("SELECT title FROM articles")
        .then(function(data) {
          res.send(data.rows);
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(err) {
      console.error("could not connect to postgres:", err);
      res.sendStatus(500);
    })
    .then(function() {
      client.end();
    });
});

app.listen(NODE_PORT, HOST);

console.log(`Running on http://${HOST}:${NODE_PORT}`);
