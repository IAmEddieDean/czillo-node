'use strict';

var Neighborhood = require('../../models/neighborhood');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'PUT',
    path: '/neighborhoods/{neighborhoodId}',
    config: {
      description: 'add a neighborhood',
      validate: {
        payload: {
          name: Joi.string().required(),
          zipCode: Joi.string().length(5).required(),
          lat: Joi.number().required(),
          lng: Joi.number().required()
        }
      },
      handler: function(request, reply){
        console.log(request.params.neighborhoodId);
        Neighborhood.findByIdAndUpdate(request.params.neighborhoodId, request.payload, function(err, neighborhood){
          return reply(neighborhood);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'neighborhoods.edit'
};
