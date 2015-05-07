'use strict';

var House = require('../../models/house');
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
          photo: Joi.string(),
          lat: Joi.number().required(),
          lng: Joi.number().required()
        }
      },
      handler: function(request, reply){
        var house = new House(request.payload);
        house.userId = request.auth.credentials._id;
        house.save();
        return reply();
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'house.create'
};
