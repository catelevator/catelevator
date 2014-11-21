/**
 * Authentication policy description
 * Also: config/policies, config/passport.js
 */

module.exports = function(req, res, next){
  if (req.isAuthenticated() && req.user){
    return next();
  }else{
  		return res.redirect('/login');
    //return res.send(403, { message: 'Not Authorized' });
  }
}