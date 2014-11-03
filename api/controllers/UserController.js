
/**
 * UserController
 *
 * Handles authorization and sessions and policies thereto related.
 * Or whatever.
 *
 * Ben Baker 2014
 */

function generateToken(hash, done){
  done(null, require('sha1')(hash+"laksjda2398fj2"))
};

var passport = require("passport");
module.exports = {

  signup: function(req,res){
    var email = req.body.email;
    generateToken(email, function(err, token){
      User.create({email:email, token:token}, function(err,user){
       
        var link = "http://localhost:1337/user/v?token="+user.token;
        var email = user.email;
        var messageContents = '<h2>Welcome to Catelevator,</h2>To complete registration please follow the link '+'<a href="'+link+'">'+link+'</a><br></br><br></br>If you cannot click on the link then you can copy pasta into the browser'
        var textContents = 'Hi there, Welcome to Catelevator. Please follow the link below to complete account creation.'+link;
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'catelevator@gmail.com',
                pass: 'jetpack1'
            }
        });

        transporter.sendMail({
            from: 'catelevator@gmail.com',
            to: email,
            subject: 'Welcome to Catelevator - Please Complete Registration!',
            text: textContents, 
            html: messageContents
        });
      });
    })
    res.view("auth/verify");
  },

  verify: function(req,res){
    //gets the username
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);

    User.find({username:username}, function(err, user){
      if(user.length != 0) res.view('auth/passwords',{ message:"Username already exists."} );
      else {
      //gets the passwords --checks if passwords are the same (in view)
        //for now
        if(password[0] != password[1]) res.view('auth/passwords',{ message:"Passwords do not match"} );
        else{
          //get token --how?
          /*
            User.findOne({token:token}, function(err,user){
              User.update({token:token},{username:username, password:password}).exec(function(err, user){
                if(err || (!user) res.view('auth/passwords',{ message:"Something went wrong"} );
                else res.view('auth/login');
              })
            })
          */
        }
      }
    })
  },

  v: function(req,res){
    var token = req.query.token;
    
    User.find({token:token}, function(err, user){
      if(user.length == 0) res.view('auth/login');
      else res.view('auth/passwords')
    }) 
  }, 

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
        res.view('auth/login',{ message:"Could not authenticate. Try again."} );
        return;
      }
      req.logIn(user, function(err){
        if (err) res.view('auth/login',{ message:"Could not authenticate. Try again."} );
        res.redirect('/u');
        return;
      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.view("auth/logout");
  },
  _config: {}
};