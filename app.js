'use strict';

const app = require('./config/server.js'),             
	port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Magic happens on port on localhost:${port}/api`);
});