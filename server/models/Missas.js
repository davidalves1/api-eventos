const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MissaSchema = new Schema({
    date: Date,
    description: String
});

module.exports = mongoose.model('Missa', MissaSchema);