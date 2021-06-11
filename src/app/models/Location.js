const { Schema, model } = require('mongoose');

const locationSchema =  new Schema({
    id: String,
    Latitude: String,
    Longitude: String
});

module.exports =  model('Locations', locationSchema);