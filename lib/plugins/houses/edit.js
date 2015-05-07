'use strict';

var House = require('../../models/house');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'PUT',
    path: '/houses/{houseId}',
    config: {
      description: 'edit a house',
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
          lng: Joi.number().required(),
          userId: Joi.string().length(24).required()
        }
      },
      handler: function(request, reply){
        console.log(request.params.houseId);
        House.findByIdAndUpdate(request.params.houseId, request.payload, function(err, house){
          return reply(house);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'houses.edit'
};
