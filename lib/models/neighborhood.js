'use strict';

var Mongoose = require('mongoose');

var neighborhoodSchema = Mongoose.Schema({
  name: {type: String, required: true},
  zipCode: {type: String, required: true},
  createdAt : {type: Date, required: true, default: Date.now}
});

var Neighborhood = Mongoose.model('Neighborhood', neighborhoodSchema);
module.exports = Neighborhood;
