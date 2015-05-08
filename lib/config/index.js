'use strict';//Need to comment on this later.

console.log('attempting to start server');

var Secrets;
try{
 Secrets = require('./secrets');
 }catch(exception){}
 
 
var env = process.env.NODE_ENV || 'development';

var common = {
  FIREBASE_SECRET: Secrets ? Secrets.FIREBASE_SECRET : process.env.FIREBASE_SECRET,
  FIREBASE_EXPIRE: 24
};

var environments = {
  development: {
    PORT: 8000,
    MONGO_URL: 'mongodb://localhost/czillo-dev'
  },
  test: {
    PORT: 0,
    MONGO_URL: 'mongodb://localhost/czillo-test'
  },
  production: {
    PORT: process.env.PORT || 0,
    MONGO_URL: process.env.MONGO_URL
  }
};

var environment = environments[env];

Object.keys(common).forEach(function(key){
  environment[key] = common[key];
});
console.log(environment);
exports.environment = environment;
