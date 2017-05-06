const events = require('./events');

module.exports = (app, db) => {
	events(app, db);
};