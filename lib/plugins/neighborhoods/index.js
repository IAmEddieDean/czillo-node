'use strict';

var Neighborhood = require('../../models/neighborhood');

exports.register = function (server, options, next){
  server.route({
    method: 'GET',
    path: '/neighborhoods',
    config: {
      description: 'get index of neighborhoods',
      handler: function(request, reply){
        Neighborhood.find({}, function(err, neighborhoods){
          return reply(neighborhoods);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'neighborhoods.index'
};
