'use strict';

var House = require('../../models/house');

exports.register = function (server, options, next){
  server.route({
    method: 'GET',
    path: '/houses/{zipCode}',
    config: {
      description: 'get index of houses for a neighborhood',
      handler: function(request, reply){
        House.find({zipCode: request.params.zipCode}, function(err, houses){
          return reply(houses);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'houses.index'
};
