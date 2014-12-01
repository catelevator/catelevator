/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  index:function(req,res){
    var content  = {};
    content.user = req.user[0];
    var q = {user_id:content.user.id}
    var q = {}
    Job.find(q).exec(function(err,jobs){
      Actions.find({user_id:content.user.id}).exec(function(err,actions){
        // var actions_json = _.pluck(actions, 'createdAt')

        actions_json = _.groupBy(actions, function(action) {
          var d = new Date( Date.parse( action.createdAt ) );
          return d.getDay()+"."+d.getHours()
        });
        var actions = []
        console.log(actions_json)
        for( a in actions_json){
          var ac = {x:a, y:actions_json[a].length} 
          actions.push( ac )
        }
        console.log(actions)

        content.actions = actions
        res.view( "profile/index", { jobs:jobs, actions:actions, user:req.user[0] } );
      })
    })

    return;
  },




  createjob:function(req,res){
  		console.log(req.params)
  		var content  = {}
      content.user = req.user[0]
  		res.view("profile/createjob", content)
  },

  viewprofile:function(req,res){
      console.log(req.params)
      var content = {}
      content.user = req.user[0]
      res.view("profile/viewprofile", content)
  },

  browse:function(req,res){
      var content  = {}
    content.user = req.user[0]

    Job.find({}).exec(function(err,jobs){

      content.jobs = err || jobs
      res.view( "profile/browse", content );
    })

    return;
  }
};

