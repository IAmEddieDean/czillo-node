'use strict';

var House = require('../../models/house');
var Joi = require('joi');

exports.register = function (server, options, next){
  server.route({
    method: 'GET',
    path: '/houses/{scope}/{param?}',
    config: {
      description: 'load a house',
      validate: {
        params: {
          scope: Joi.string().required(),
          param: Joi.string()
        }
      },
      handler: function(request, reply){
        switch (request.params.scope){
          case 'zip':
            House.find({zipCode: request.params.param}, function(err, houses){
              return reply(houses);
            });
            break;
          case 'one':
            House.findOne({_id: request.params.param}, function(err, house){
              return reply(house);
            });
            break;
          case 'all':
            try {
            if(request.auth.credentials._id){
              if(request.params.param === 'full'){
                House.find({}, function(err, houses){
                  return reply(houses);
                });
              }
              
              House.find({userId: request.auth.credentials._id}, function(err, houses){
                return reply(houses);
              });
            }
            }catch(ex){
              console.log(ex);
              House.find({}, function(err, houses){
                return reply(houses);
              });
            }
        }
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'houses.gethouse'
};
