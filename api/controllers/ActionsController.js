/**
 * ActionsController
 *
 * @description :: Server-side logic for managing actions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  new_do: function(req,res){

    if(typeof req.session.task_count == 'undefined')
      req.session.task_count = 1
    else
      req.session.task_count++

    var user_id = req.session.passport.user
    var task_id = req.body.task_id;
    var job_id = req.body.job_id;
    var input = req.body.input;
    var type = req.body.type;

    Actions.create({
      user_id:user_id||1
      ,task_id:task_id
      ,job_id:job_id
      ,input:input
      ,type:type
    })
    .exec(function(err,action){
    
      // TODO join where user has'nt done task
      
      // TODO pagination
      
      console.log(action)

      Task.find({type:type,skip:req.session.task_count}).exec(function(err,task){
        res.send(task[0])
      })

    })



  }


};

