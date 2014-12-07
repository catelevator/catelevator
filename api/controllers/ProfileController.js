/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require("underscore")

module.exports = {



  index:function(req,res){
    var content  = {};
    content.user = req.user[0];

    var q = {user_id:content.user.id}
    var q = {}

    Actions.find({ user_id : req.user[0].id} ).populate("job_id").exec(function(err,actions){
      var balance = 0;
      _.map(actions, function(action){
        balance+= (action.job_id ? action.job_id.reward : 0)
      })
      content.user.balance = Math.round(balance*1000)/1000
      User.update(content.user.id, {balance:balance}).exec(function(a,b){console.log(a,b)})


      Job.find(q).exec(function(err,jobs){
        Actions.find({user_id:content.user.id}).exec(function(err,actions){
          // var actions_json = _.pluck(actions, 'createdAt')
          if(err) return res.view( "profile/index", { jobs:jobs, actions:(actions||[]), user:req.user[0] } );
          actions_json = _.groupBy(actions, function(action) {
            var d = new Date( Date.parse( action.createdAt ) );
            return d.getDay()+"."+d.getHours()
          });

          var actions_counts = _.groupBy(actions, function(action) {
            return action.job_id
          });

          _.map(jobs, function(jb){
            jb.progress = ( typeof actions_counts[jb.id] !== 'undefined' ? Math.ceil(actions_counts[jb.id].length/jb.taskCount*100) : 0 )
          })
          console.log(jobs)

          var jbs = _.reject(jobs, function(jb){
            return (jb.progress == 0)
          })

          var actions = []
          console.log(actions_json)
          for( a in actions_json){
            var ac = {x:a, y:actions_json[a].length} 
            actions.push( ac )
          }
          console.log(actions)

          content.actions = actions
          res.view( "profile/index", { jobs:jbs, actions:actions, user:req.user[0] } );
        })
      })
    })

    return;
  },
  //
  //  index:function(req,res){
  //    var content  = {};
  //    content.user = req.user[0];
  //    var q = {user_id:content.user.id}
  //    var q = {}
  //    Job.find(q).exec(function(err,jobs){
  //      Actions.find({user_id:content.user.id}).exec(function(err,actions){
  //        // var actions_json = _.pluck(actions, 'createdAt')
  //        if(err) return res.view( "profile/index", { jobs:jobs, actions:(actions||[]), user:req.user[0] } );
  //        actions_json = _.groupBy(actions, function(action) {
  //          var d = new Date( Date.parse( action.createdAt ) );
  //          return d.getDay()+"."+d.getHours()
  //        });
  //        var actions = []
  //        console.log(actions_json)
  //        for( a in actions_json){
  //          var ac = {x:a, y:actions_json[a].length} 
  //          actions.push( ac )
  //        }
  //        console.log(actions)
  //
  //        content.actions = actions
  //        res.view( "profile/index", { jobs:jobs, actions:actions, user:req.user[0] } );
  //      })
  //    })
  //
  //    return;
  //  },



  createjob:function(req,res){
  		console.log(req.params)
  		var content  = {}
      content.user = req.user[0]
  		return res.view("profile/createjob", content)
  },

  viewprofile:function(req,res){
    console.log(req.params)
    var content = {}
    content.user = req.user[0]
    return res.view("profile/viewprofile", content)
  },

  browse:function(req,res){
    var content  = {}
    content.user = req.user[0]
    Job.find({}).exec(function(err,jobs){
      content.jobs = err || jobs
      return res.view( "profile/browse", content );
    })

  },

  analyze:function(req,res){
    var content  = {}
    content.user = req.user[0]

    Job.find({creator:content.user.id}).exec(function(err,jobs){
      content.jobs = jobs||err
      return res.view( "profile/analyze", content );
    })
  }
};

