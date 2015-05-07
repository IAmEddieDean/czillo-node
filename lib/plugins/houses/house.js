'use strict';

var House = require('../../models/house');
var Neighborhood = require('../../models/neighborhood');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'POST',
    path: '/houses',
    config: {
      description: 'save a house',
      validate: {
        payload: {
          address: Joi.string().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          zipCode: Joi.string().required(),
          bedrooms: Joi.number().min(0).required(),
          bathrooms: Joi.number().min(0).required(),
          price: Joi.number().min(0).required(),
          sqFt: Joi.number().min(0).required(),
          photo: Joi.string(),
          lat: Joi.number().required(),
          lng: Joi.number().required()
        }
      },
      handler: function(request, reply){
        var zip = request.payload.zipCode;
        Neighborhood.findOne({zipCode: zip}, function(err, neighborhood){
          if(!neighborhood){
            var n = new Neighborhood({name: zip, zipCode: zip, lat: request.payload.lat, lng: request.payload.lng});
            n.save();
          }
        });
        
        var house = new House(request.payload);
        house.userId = request.auth.credentials._id;
        console.log(request.auth.credentials.firebaseId);
        house.firebaseId = request.auth.credentials.firebaseId;
        house.save();
        return reply(house);
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'house.create'
};
