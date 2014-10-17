
/**
 * UserController
 *
 * Handles authorization and sessions and policies thereto related.
 * Or whatever.
 *
 * Ben Baker 2014
 */


var passport = require("passport");
module.exports = {
  login: function(req,res){
    res.view("auth/login");
  },
  
  mads: function(req,res){
    User.create({username:'mads',password:'shit'},
    function(err,user){res.send(user)});  
  },

  process: function(req,res){
    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)) {
        console.log("usercontroller.process",err, user, info)
        res.view('auth/login',{ message:(info||"Could not authenticate. Try again or something.")} );
        return;
      }
      req.logIn(user, function(err){
        if (err) res.view('auth/login',{ message:"Could not authenticate. Try again or something."} );
        res.redirect('/u');
        return;
      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  },
  _config: {}
};


