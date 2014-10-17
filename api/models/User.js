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
      required: true,
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
      required: true
    },
  },


  task_count: function(){
    Tasks.count({user_id:this.id}, function(err,result){
      console.log(result);
    })
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
};

