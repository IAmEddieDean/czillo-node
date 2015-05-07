'use strict';

var Neighborhood = require('../../models/neighborhood');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'POST',
    path: '/neighborhoods',
    config: {
      description: 'add a neighborhood',
      validate: {
        payload: {
          name: Joi.string().required(),
          zipCode: Joi.string().length(5).required()
        }
      },
      handler: function(request, reply){
        var neighborhood = new Neighborhood(request.payload);
        neighborhood.save();
        return reply(neighborhood);
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'neighborhoods.create'
};
