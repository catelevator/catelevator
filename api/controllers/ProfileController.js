/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index:function(req,res){
    var content  = {}
    content.user = req.user[0]

    Job.find({}).exec(function(err,jobs){

      content.jobs = err || jobs
      res.view( "profile/index", content );
    })

    return;
  },

  createjob:function(req,res){
  		console.log(req.params)
  		var content  = {}
      content.user = req.user[0]
  		res.view("profile/createjob", content)
  },
};
