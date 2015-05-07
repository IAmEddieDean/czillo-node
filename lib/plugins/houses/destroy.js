'use strict';

var House = require('../../models/house');

exports.register = function (server, options, next){
  server.route({
    method: 'DELETE',
    path: '/houses/{houseId}',
    config: {
      description: 'delete a house',
      handler: function(request, reply){
        House.findById(request.params.houseId, function(err, house){
          house.remove();
          return reply(house);
        });
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'house.delete'
};
