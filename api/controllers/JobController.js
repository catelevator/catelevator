/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  index:function(req,res){
    Job.find({}).exec(function(e,jobs){
      console.log("error:",e)
      console.log("jobs:",jobs)
      res.view("job/index",{ jobs:jobs })
    });

  },


  bounce: function(req,res){
    
    Job.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Job.destroy(thing.id, function(err,done){
          console.log(err,done)
        })
      })
    })
    
    Task.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Task.destroy(thing.id, function(err,done){
          console.log(err,done)
        })
      })
    })



    Job.create([
      {
        name:"Solve the captcha", 
        type:"captchasolving",
        reward:0.01,
        desc: "Type the letters in the box."
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"featuredetection",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/NOGJwjbb.jpg',
          type:"featuredetection",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"featuredetection",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }

        console.log("bounced jobs")
      })

    })


    Job.create([
      {
        name:"Find the cats", 
        type:"featuredetection",
        reward:0.02,
        desc: "Select whether or not a feature exists in a dataset."
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"featuredetection",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/X6qwKTU.png',
          type:"featuredetection",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/zS59sKQ.jpg',
          type:"featuredetection",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/xoz937V.jpg',
          type:"featuredetection",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }
        res.send("bounced jobs")})


    })










  }
};

