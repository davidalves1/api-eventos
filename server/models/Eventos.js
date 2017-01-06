const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    date: Date,
    description: String
});

module.exports = mongoose.model('Evento', EventoSchema);