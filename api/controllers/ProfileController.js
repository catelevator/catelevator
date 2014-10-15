/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index:function(req,res){
    console.log("profilecontroller.index",req.user)
    if(req.user)
      res.view("profile/index",{ user:req.user[0] });
    else
      res.view("profile/index");
  }
};

