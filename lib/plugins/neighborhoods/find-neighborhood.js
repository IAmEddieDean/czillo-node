'use strict';

var Neighborhood = require('../../models/neighborhood');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'GET',
    path: '/neighborhoods/{neighborhoodZipCode}',
    config: {
      description: 'load a neighborhood',
      validate: {
        params: {
          neighborhoodZipCode: Joi.string().length(5).required()
        }
      },
      handler: function(request, reply){
        Neighborhood.findOne({zipCode: request.params.neighborhoodZipCode}, function(err, neighborhood){
          return reply(neighborhood);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'neighborhoods.getneighborhood'
};
