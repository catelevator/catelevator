/**
 * ActionsController
 *
 * @description :: Server-side logic for managing actions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require("underscore")

module.exports = {
	
  bounce: function(req,res){
    Actions.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Actions.destroy(thing.id, function(err,done){
        })
      })
      res.send("bounced")
    });

  },


  new_do: function(req,res){
    var job_id = req.body.job_id;
    res.view({ job_complete: false });

    if(typeof req.session.task_count == 'undefined')
      req.session.task_count = 1
    else
      req.session.task_count++

    //This gets the task count of the current job 
    Job.find({job_id:req.body.job_id}, function(err, job){
      Task.count({job_id:job_id}, function(err,result){
        numberOfTasks = result;
        if(numberOfTasks == req.session.task_count)
          res.view('/finishedJob', {job_complete: true });
        else {
          console.log(req.session.task_count)

          var user_id = req.session.passport.user||1
          var task_id = req.body.task_id;
          //var job_id = req.body.job_id;
          var input = req.body.input;
          var input_type = req.body.input_type;
          var type = req.body.type;

          Actions.create({
            user_id:user_id
            ,task_id:task_id
            ,job_id:job_id
            ,input_type:input_type
            ,input:input
            ,type:type
          })
          .exec(function(err,action){
            res.json(err||action)
          })
        }   
      })
    })
  },
};

