require('dotenv').config();

module.exports = {
	url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds157078.mlab.com:57078/db-eventos`
}