const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    date: Date,
    description: String,
    created_date: {
    	type: Date,
    	Default: Date.now
    }
});

module.exports = mongoose.model('Evento', EventoSchema);