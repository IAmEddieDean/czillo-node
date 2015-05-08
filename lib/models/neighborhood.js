'use strict';

var Mongoose = require('mongoose');

var neighborhoodSchema = Mongoose.Schema({
  name: {type: String, required: true},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  zipCode: {type: String, index: {unique: true, dropDups: true}},
  createdAt : {type: Date, required: true, default: Date.now}
});

var Neighborhood = Mongoose.model('Neighborhood', neighborhoodSchema);
module.exports = Neighborhood;
