/**
 * Handles oauth.
 *
 * TODO: Extend to oauth, twitter, fb, github, others.
 */

var passport    = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

/**
 * Serializes the user
 * @param  {Array[Object]}   The User object
 * @param  {Function} done The callback function
 */

passport.serializeUser(function(user, done) {
  done(null, user[0].id);
});

/**
 * Deserializes the user
 * @param  {String}     id   The user's id
 * @param  {Function} done The callback function
 */

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/**
 * Sets up local strategy for passport.
 * @param  {String} username [description]
 * @param  {String} password [description]
 * @param  {Function} done)  [description]
 */

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find({username:username}).exec(function(err, user) {
      if (err) { return done(null, err); }
      if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
      bcrypt.compare(password, user[0].password, function(err, res) {
        if (!res) return done(null, false, { message: 'Invalid Password'});
        return done(null, user);
      });
    });
  })
);


/**
 * Exports the public functionality.
 * @type {Object}
 */

module.exports = {
 express: {
    customMiddleware: function(app){
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};



