'use strict';

const mongoose = require('mongoose'),
	url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds157078.mlab.com:57078/db-eventos`;

require('dotenv').config();

const dbConnection = () => {
	return mongoose.connect(url);
}

module.exports = () => {
	console.log('Nova conexão com o banco de dados.');
	return dbConnection;
}