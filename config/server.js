'use strict';

const express = require('express');
const consign = require('consign');
const app = express();

const bodyParser = require('body-parser');

// bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// Resolve the cross-origin problem
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log(`method: ${req.method} | url: ${req.url}`);

	next();
});

consign()
    .include('app/routes')
    .then('config/db_connection.js')
    .then('app/models')
    .into(app);

module.exports = app;