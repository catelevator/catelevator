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

    var uq = {user_id:req.user[0].id}
    var i = 0

    /**
     * Get all the actions which this user has performed
     * @param  {[type]} err     
     * @param  {[type]} actions 
     * @return {[type]}         
     */
    Actions.find(uq).populate("job_id").exec(function(err,actions){
      /**
       * Add up all the reqards for all the actions as retrieved form their parent jobs
       * @type {Number}
       */ 
      var balance = 0;
      _.map(actions, function(action){
        balance+= (action.job_id ? action.job_id.reward : 0)
      })

      /**
       * Save that balance to the user
       * @type {[type]}
       */
      content.user.balance = Math.round(balance*1000)/1000
      // User.update(content.user.id, {balance:balance}).exec(function(a,b){console.log(a,b)})

      /**
       * Grab all of the jobs
       * @param  {[type]} err  
       * @param  {[type]} jobs 
       * @return {[type]}      
       */
      Job.find().exec(function(err,jobs){
          
          // if(err) return res.view( "profile/index", { jobs:jobs, actions:(actions||[]), user:req.user[0] } );

          /**
           * Group all of the actions by there fucking dates
           * @param  {[type]} action 
           * @return {[type]}        
           */
          var actions_json = _.groupBy(actions, function(action) {
            var d = new Date( Date.parse( action.createdAt ) );
            return d.getHours()
          });


          /**
           * group all the fucking actions by thir job IDS.
           */
          var actions_counts = _.groupBy(actions, function(action) {
            console.log(action);
            return action.job_id.id
          });
          /**
           * Walk through all of the jobs and calculate the progress as 
           * a function of the actions finished by the user over the total tasks in the job.
           * @param  {[type]} jb 
           * @return {[type]}    
           */
          _.map(jobs, function(jb){
            jb.progress = ( typeof actions_counts[jb.id] !== 'undefined' ? Math.ceil(actions_counts[jb.id].length/jb.taskCount*100) : 0 )
          })

          /**
           * Drop all of the jobs that don't have any user progress
           * @param  {[type]} jb 
           * @return {[type]}    
           */
          var jbs = _.reject(jobs, function(jb){
            return (jb.progress == 0)
          })

          /**
           * Walk through all the fuckig actions in that actions_json
           * and make the shit for the activity chart.
           */
          var assssss = []
          for( a in actions_json){
            var ac = {x:a, y:actions_json[a].length} 
            assssss.push( ac )
          }
          /**
           * Send all that shit to the view like a bad ass.
           * @type {[type]}
           */
          return res.view( "profile/index", { jobs:jbs, actions:assssss, user:req.user[0] } );
      })
    })

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

