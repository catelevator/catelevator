/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var path = require("path")
var merge = require("merge")

module.exports = {

  put:function(req,res){
    /**
     * Sets the upload save path for the image to be searched.
     * @type {Object}
     */
    var uploadPath = { dirname: '../public/images'};

    req.file('file').upload(uploadPath, function onUploadComplete (err, uploadedFiles) {
      
      console.log(uploadedFiles);
      if (err) 
        return res.send(500, err);
    
      var uploaded = uploadedFiles[0]

      var new_task = merge (uploaded, {
        filename:path.basename(uploaded.fd), 
        location:path.dirname(uploaded.fd), 
        job_id:req.body.job_id, 
        src:"/images/"+path.basename(uploaded.fd)
      })

      Task.create(new_task, function(err,task){
          res.send(task);
      })

    })
  },



  allActions: function(req,res){

    Task.findOne({type:"featurefinding",skip:1}).exec(function(err,task){
      Actions.find({task_id:task.id}).exec(function(err,actions){
        task.actions = actions
        console.log(actions);
        res.view( "tasks/tasks", { tasks:[task] });
      })
    })
  },



  render: function(req,res){

    Actions.find({input_type:"circle",limit:10}).exec(function(err,actions){
      console.log(actions)
      res.view( "actions/circle", { actions:actions } );
    })

  },




};

