'use strict';

var Neighborhood = require('../../models/neighborhood');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'GET',
    path: '/neighborhoods/{neighborhoodId}',
    config: {
      description: 'load a neighborhood',
      validate: {
        params: {
          neighborhoodId: Joi.string().length(24).required()
        }
      },
      handler: function(request, reply){
        console.log(request.params.neighborhoodId);
        Neighborhood.findById(request.params.neighborhoodId, function(err, neighborhood){
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
