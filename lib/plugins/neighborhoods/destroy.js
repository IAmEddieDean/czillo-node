'use strict';

var Neighborhood = require('../../models/neighborhood');

exports.register = function (server, options, next){
  server.route({
    method: 'DELETE',
    path: '/neighborhoods/{hood}',
    config: {
      description: 'delete a neighborhood',
      handler: function(request, reply){
        Neighborhood.findById(request.params.hood, function(err, neighborhood){
          neighborhood.remove();
          return reply(neighborhood);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'neighborhoods.delete'
};
