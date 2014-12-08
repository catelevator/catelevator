/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    job_id: {
      model: 'job'
    },
    actions: {
      collection: 'actions',
      via: 'task_id'
    }
  },


  afterCreate: function(shit, done){
    var j = shit.job_id;
    console.log("job_id",j)
    Task.count({job_id:j}).exec(function(err, count){
      Job.update({id:j}, {taskCount:count}).exec(function(err,job){
        console.log(err,job)
        done()
      })
    })
  },



};

