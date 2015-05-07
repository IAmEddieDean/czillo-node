'use strict';

var Mongoose = require('mongoose');

var houseSchema = Mongoose.Schema({
  address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zipCode: {type: String, required: true},
  bedrooms: {type: Number, required: true},
  bathrooms: {type: Number, required: true},
  price: {type: Number, required: true},
  sqFt: {type: Number, required: true},
  photo: {type: String},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  firebaseId: {type: String, required: true},
  createdAt : {type: Date, required: true, default: Date.now}
});

var House = Mongoose.model('House', houseSchema);
module.exports = House;
