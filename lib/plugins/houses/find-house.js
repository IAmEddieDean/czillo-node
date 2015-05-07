'use strict';

var House = require('../../models/house');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'GET',
    path: '/houses/show/{houseId}',
    config: {
      description: 'load a house',
      validate: {
        params: {
          houseId: Joi.string().length(24).required()
        }
      },
      handler: function(request, reply){
        console.log(request.params.houseId);
        House.findOne({_id: request.params.houseId}, function(err, house){
          return reply(house);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'houses.gethouse'
};
