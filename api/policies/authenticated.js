/**
 * Authentication policy description
 * Also: config/policies, config/passport.js
 */

module.exports = function(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }else{
    return res.send(403, { message: 'Not Authorized' });
  }
}