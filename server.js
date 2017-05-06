const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db')

console.log(db.url);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// Resolve the cross-origin problem
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// console.log(`method: ${req.method} | url: ${req.url}`);

	next();
});

const port = process.env.PORT || 5000;

MongoClient.connect(db.url, (err, database) => {

	if (err) return console.log(err);

	require('./app/routes')(app, database);

	app.listen(port, () => {
		console.log(`The magic happens in port ${port}`);
	});
});