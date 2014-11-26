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
      if (err) return res.send(500, err)
    

        var new_task = merge (uploadedFiles[0], {
          name:"cbr_search", 
          filename:path.basename(uploadedFiles[0].fd), 
          location:path.dirname(uploadedFiles[0].fd), 
          src:"/images/"+path.basename(uploadedFiles[0].fd)
        })


        Task.create(new_task, function(err,task){
            res.send(task);
        })



    })
  },

};

