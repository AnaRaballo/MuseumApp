const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MuseumSchema = Schema({
    name: String,
    city: String,
    country: String
});

const Museum = mongoose.model('Museum', MuseumSchema);

module.exports = Museum;
