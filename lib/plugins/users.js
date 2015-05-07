'use strict';

var User = require('../models/user');

exports.register = function (server, options, next){
  server.route({
    method: 'PUT',
    path: '/users',
    config: {
      description: 'update user profile',
      handler: function(request, reply){
          if(request.auth.credentials._id){
            User.findByIdAndUpdate(request.auth.credentials._id, saveCallback);
          }else{
            var user = new User();
            user.firebaseId = request.auth.credentials.firebaseId;
            user.save(saveCallback);
          }

        function saveCallback(err, user){
          if(err){
            return reply(JSON.stringify(err)).code(400);
          }else{
            return reply(user);
          }
        }
      }
    }
  });
  return next();
};


exports.register.attributes = {
  name: 'users.update'
};
