/**
 * User.js
 * Uses bcrypt to store passwords as not plaintext.
 * Vital to security. Do not mess with this... much.
 *
 * Ben Baker 2014
 */

var bcrypt = require("bcrypt");
var _ = require("underscore")

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    points: {
      type: 'float',
      defaultsTo:0.00
    },
    btc: {
      type: 'float',
      defaultsTo:0.00
    },
    expert_level:{
      type: 'float',
      defaultsTo:0
    },
    password: {
      type: 'string',
    },
    token: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
  },

  task_count: function(){
    Tasks.count({user_id:this.id}, function(err,result){
      console.log(result);
    })
  },

  // beforeCreate: function(user, done) {
  //   if(!user.password) done(null, user)
  //   done(null, require('sha1')(user.email+"laksjda2398fj2"))

  //   done(null, user);
  // }
};

